var handler = require('../src/index.js')
   ,env = require('dotenv')
   ,token = ""
   ,teamId = ""
   ,lists = [];

env.config();

var context = function() {
  return {
    succeed: function(err, result) {
      console.log("Error: ", err);
      console.log("Result", result);
    },
    done: function(err, result) {
      console.log("Error: ", err);
      console.log("Result", result);
    },
    fail: function(err, result) {
      console.log("Error: ", err);
      console.log("Result", result);
    }
  }
}

var auth_context = context()
  , list_context = context()
  , add_to_list_context = context();

auth_context.done = function(err, result) {
  if (err) {
    console.log(err);
  } else {
    token = result.authToken;   
    teamId = result.teamId;
    list_event.token = token;
    list_event.teamId = teamId;
    handler.handler(list_event, list_context);
  }
}
  
list_context.done = function(err, result) {
  lists = result.response.shoppingLists;
  console.log(lists);

  var list = lists[0];

  add_to_list_event.listId = list.id;
  add_to_list_event.token = token;
  add_to_list_event.teamId = teamId;

  handler.handler(add_to_list_event, add_to_list_context);

}
add_to_list_context.done = function(err, result) {
  console.log(result);
}

var auth_event = {
  userName: process.env.OUR_GROCERIES_USERNAME,
  password: process.env.OUR_GROCERIES_PASSWORD,
  operation: "auth"
}

var list_event = {
  token: token,
  teamId: teamId,
  operation: "getLists"
}

var add_to_list_event = {
  token: token,
  teamId: teamId,
  operation: "addToList",
  list: process.env.OUR_GROCERIES_LIST,
  itemName: process.env.OUR_GROCERIES_ITEM
}

handler.handler(auth_event, auth_context);