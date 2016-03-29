'use strict';

console.log('Loading function');

var http = require("http")
    , APP_ID = ""
    , OurGroceriesClient = require('our-groceries-client')
    , client = new OurGroceriesClient(APP_ID);

// exports.handler = function(event, context) {
//   client.authenticate(event.userName, event.password, function(result){
//       if (result.success) {
//         client.getLists(function(result){
//           if (result.success) {
//             var list = result.response.shoppingLists[0];
//             client.addToList(list.id, "Colored Eggs", 1, function(response) {
//               console.log()
//             });
//           }
//         });
//       } else {
//         //error
//       }
//   });
// }

exports.handler = function(event, context) {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    if (!event.operation) {
      context.fail("An operation must be supplied");
    } else {
      switch(event.operation) {
        case "auth" :
          client.authenticate(event.userName, event.password, (result)=>{
            context.done(null, {authToken:client.auth, teamId: client.teamId});
          });
          break;
        case "getLists":
          if (!event.token) {
            context.fail("A token is required for this operation. Please call auth first");
          } else if (!event.teamId) {
            context.fail("A team idken is required for this operation. Please call auth first");
          } else {
            client.auth = event.token;
            client.teamId = event.teamId;
            client.getLists((result)=>{
              context.done(null, result);
            });
          }
          break;
        case "addToList":
          if (!event.token) {
            context.fail("A token is required for this operation. Please call auth first");
          } else if (!event.teamId) {
            context.fail("A team idken is required for this operation. Please call auth first");
          } else if (!event.listId) {
            context.fail("A list id is required");
          } else if (!event.itemName) {
            context.fail("An item is required (itemName)")
          } else {
            client.auth = event.token;
            client.teamId = event.teamId;
            client.addToList(event.listId, event.itemName, 1, (result)=>{
              context.done(null, result);
            });
          }
          break;
      }
    }
};