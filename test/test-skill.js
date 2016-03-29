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
    "sessionId": "SessionId.0773edcd-153b-41e0-b4db-a9c63a572f1f",
    "application": {
      "applicationId": "amzn1.echo-sdk-ams.app.75f53fbc-5de6-441a-9a07-716573e6c5cc"
    },
    "user": {
      "userId": "amzn1.ask.account.AFP3ZWPOS2BGJR7OWJZ3DHPKMOMNWY4AY66FUR7ILBWANIHQN73QGQMRSXF53JAJASB43RPDQIV52NMXRV7MVDQK4SF6BAMAHV5ICFRUNC4H65BPAIYEWGGQA56YYNY2B6PG3XAFMXBYEVEAFNTBHEUTNK6RQYK337OV2OZAKNCWG4QEHT5HAP7JV5QRILPJPH7D3G42ELEZVXY"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.0ace2561-2114-40f8-bdf8-8b1d1947618a",
    "timestamp": "2016-03-26T19:11:50Z",
    "intent": {
      "name": "AddItem",
      "slots": {
        "itemName": {
          "name": "itemName",
          "value": "apples"
        },
        "listName": {
          "name": "listName",
          "value": "West side"
        }
      }
    }
  },
  "version": "1.0"
}

hdl.handler(event, context);