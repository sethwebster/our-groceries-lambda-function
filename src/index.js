'use strict';

import AlexaSkill from './AlexaSkill';
import http from 'http';
import OurGroceriesClient from 'our-groceries-client';
import extend from 'extend';
import env from 'dotenv';

//import doc from 'dynamo-doc';

if (env.config) {
  env.config();
}

const userName = process.env.OUR_GROCERIES_USERNAME,
      password = process.env.OUR_GROCERIES_PASSWORD,
      APP_ID = "amzn1.echo-sdk-ams.app.75f53fbc-5de6-441a-9a07-716573e6c5cc";

var client = new OurGroceriesClient();
 // , dynamo = new AWS.DynamoDB({region:'us-east-1'});

class OurGroceriesSkill extends AlexaSkill {
  constructor(appId) {
    super(appId);
    console.log(this._appId);
  }
  AddItem(itemName, listName, quantity, intent, session, response) {
    quantity = quantity || 1;
    if (!itemName) {
      return response.ask("You didn't seem to specify what item you wanted to add to your list. Please try again. For example, add Apples to Trader Joe's list.");      
    } else if (!listName) {
      return response.ask("You didn't seem to specify which list you want to use. Please try again. For example, add Apples to Trader Joe's list.");      
    } else {
      client.authenticate (userName, password, (authResult)=>{
        if (authResult.success) {
          client.getLists((listResult)=>{
            if (listResult.success) {
              var lists = listResult.response.shoppingLists;
              var list = this.FindList(listName, lists);
              if (list) {
                client.addToList(list.id, itemName, quantity, (addResult)=>{
                  if (addResult.success) {
                    response.tell("Ok, I've got it. "+itemName+" has been added to your "+list.name+" list");
                  } else {
                    response.tell("I'm sorry. There was an error adding that to your list");
                  }
                });
              } else {
                response.tell("I was unable to find a list with the name " + listName+". You may add it in the Our Groceries app.");;
              }
            } else {
              response.tell("I was unable to get your lists from Our Groceries");
            }
          });
        } else {
          response.tell("There was an error logging in. Visit the Our Groceries Alexa App to Auth");
        }
      });
    }
  }

  FindList(listName, allLists) {
    listName = listName.toLowerCase().replace(/\W/g, '');
    allLists = allLists.map((item) => {
      item.matchName = item.name.toLowerCase().replace(/\W/g, '');
      return item;
    });
    var candidates = allLists.filter((item) => item.matchName.indexOf(listName) === 0 || listName.indexOf(item.matchName) === 0);
    return candidates.length > 0 ? candidates[0] : null;
  }
}

OurGroceriesSkill.prototype.eventHandlers.onLaunch = function(launchRequest, session, response) {
  var welcome  = "Welcome to Our Groceries for Echo." +
                "You may add items to your Our Groceries lists just by asking Alexa. For example, say, Add apples to my Trader Joe's list."
    , reprompt = "Try it now, or say cancel.";                 

  response.ask(welcome, reprompt);
}

OurGroceriesSkill.prototype.intentHandlers = {
  AddItem: function(intent, session, response) {
    var skill = new OurGroceriesSkill()
    var reprompt = "Say something like add apples to my trader joe's list";
    if (!intent.slots.itemName) {
      response.ask("It doesn't seem like you told me what item you want to add to the list", reprompt);
    } else if (!intent.slots.listName) {
      response.ask("It doesn't seem like you told me which list you want to use.", reprompt);
    } else {
      skill.AddItem(intent.slots.itemName.value, intent.slots.listName.value, 1, intent, session, response);
    }
  }
}

exports.handler = function(event, context) {
    var skill = new OurGroceriesSkill();
    skill.execute(event, context);
};
// exports.handler = function(event, context) {
//     //console.log('Received event:', JSON.stringify(event, null, 2));
//     if (!event.operation) {
//       context.fail("An operation must be supplied");
//     } else {
//       switch(event.operation) {
//         case "auth" :
//           client.authenticate(event.userName, event.password, (result)=>{
//             context.done(null, {authToken:client.auth, teamId: client.teamId});
//           });
//           break;
//         case "getLists":
//           if (!event.token) {
//             context.fail("A token is required for this operation. Please call auth first");
//           } else if (!event.teamId) {
//             context.fail("A team idken is required for this operation. Please call auth first");
//           } else {
//             client.auth = event.token;
//             client.teamId = event.teamId;
//             client.getLists((result)=>{
//               context.done(null, result);
//             });
//           }
//           break;
//         case "addToList":
//           if (!event.token) {
//             context.fail("A token is required for this operation. Please call auth first");
//           } else if (!event.teamId) {
//             context.fail("A team idken is required for this operation. Please call auth first");
//           } else if (!event.listId) {
//             context.fail("A list id is required");
//           } else if (!event.itemName) {
//             context.fail("An item is required (itemName)")
//           } else {
//             client.auth = event.token;
//             client.teamId = event.teamId;
//             client.addToList(event.listId, event.itemName, 1, (result)=>{
//               context.done(null, result);
//             });
//           }
//           break;
//       }
//     }
// };