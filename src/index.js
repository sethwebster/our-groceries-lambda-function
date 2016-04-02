'use strict';

import http from 'http';
import OurGroceriesClient from 'our-groceries-client';
import OurGroceriesSkill from 'our-groceries-skill';
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
var skill = new OurGroceriesSkill(APP_ID, client, userName, password);

exports.handler = function(event, context) {    
    skill.execute(event, context);
};