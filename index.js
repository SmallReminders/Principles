'use strict';

/*
 * Dependencies
 */
// Mongo Setup
require('dotenv').config();
const mongoDB = require('./utils/mongoDB');
mongoDB.connect();
require('./schema/Principle'); // mongoose schema
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Principle = mongoose.model('Principle');
const defaultPrinciples = require('./const/sample');

/*
 * Entry Point
 */
exports.handler = async (event, context, callback) => {
  let responseCode = 200;
  let responseBody;
  try {
    let payload;
    console.log('request: ' + JSON.stringify(event));

    if (!('uid' in event.pathParameters)) {
      payload = { principles: defaultPrinciples };
    } else {
      const uid = event.pathParameters.uid;

      if (event.httpMethod === 'GET') {
        const principles = await getPrinciplesByUid(uid);
        payload = { principles };
      }
    }
    responseBody = {
      event,
      payload
    };
  } catch (err) {
    responseCode = 404;
    responseBody = { err };
  }
  // The output from a Lambda proxy integration must be
  // in the following JSON object. The 'headers' property
  // is for custom response headers in addition to standard
  // ones. The 'body' property  must be a JSON string. For
  // base64-encoded payload, you must also set the 'isBase64Encoded'
  // property to 'true'.
  const response = {
    statusCode: responseCode,
    headers: {
      'x-custom-header': 'my custom header value'
    },
    body: JSON.stringify(responseBody)
  };
  console.log('response: ' + JSON.stringify(response));
  return response;
};

const getPrinciplesByUid = (uid) => {
  const query = {
    owner: uid
  };
  return Principle.find(query);
};
