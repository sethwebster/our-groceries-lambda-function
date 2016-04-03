console.log("Test Harness for Our Groceries Skill");
var hdl = require('../build/index.js');

var context = {
  succeed: function(err, result) {
    this.done(err,result);
  },
  fail: function(err, result) {
    this.done(err, result);
  },
  done: function(err, result) {
    console.log('------------');
    console.log('Context done');
    console.log('   error:', err);
    console.log('   result:', result);
  }
}

var event ={
  "session": {
    "sessionId": "SessionId.be517a62-1466-4637-8de9-11fe822ddcfe",
    "application": {
      "applicationId": "amzn1.echo-sdk-ams.app.75f53fbc-5de6-441a-9a07-716573e6c5cc"
    },
    "user": {
      "userId": "amzn1.ask.account.AFP3ZWPOS2BGJR7OWJZ3DHPKMOMNWY4AY66FUR7ILBWANIHQN73QHWYV76ACAENR47XVVBAGJ7ZYA37HYT6GTVMFYRZEAMU5I3EVWVBNWTTIXXRLVIJYEYUNJHG4SUOM4BXK6TJBIQF5SCTZV75UQ2K53GWM4T3KL7V455XMAFY5CBKV7FDUOKLIEQL3TXJKFFQJAJ6N66D3BYI"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.7bd7c6d4-b70d-4cc1-baaa-5c1cff95be04",
    "timestamp": "2016-04-03T11:55:40Z",
    "intent": {
      "name": "AddItem",
      "slots": {
        "itemName": {
          "name": "itemName",
          "value": "snapple"
        },
        "listName": {
          "name": "listName",
          "value": "west side"
        }
      }
    }
  },
  "version": "1.0"
}

hdl.handler(event, context);