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

var event = {
  "session": {
    "sessionId": "SessionId.d617a480-8279-42a6-94ca-730807c01b97",
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
    "requestId": "EdwRequestId.f0339635-365c-4d3a-a923-234a9cd078f0",
    "timestamp": "2016-04-03T01:31:42Z",
    "intent": {
      "name": "ListLists",
      "slots": {
        "listName": {
          "name": "listName",
          "value": "trader joe's"
        }
      }
    }
  },
  "version": "1.0"
}

hdl.handler(event, context);