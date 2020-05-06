'use strict';

/*
 * Dependencies
 */
require('dotenv').config();
// require('schema/Principle'); // mongoose schema
require('schema'); // mongoose schema
const defaultPrinciples = require('./const/sample');

// Mongo setup
const mongoDB = require('./utils/mongoDB');
mongoDB.connect();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Principle = mongoose.model('Principle');

/*
 * Entry Point
 */
exports.handler = async (event, context, callback) => {
  let responseCode = 200;
  let responseBody;
  try {
    let payload;
    console.log('request: ' + JSON.stringify(event));
    /* parse request */
    if (!event.pathParameters || !('uid' in event.pathParameters)) {
      // if no uid given, return default principles
      payload = { principles: defaultPrinciples };
    } else {
      // handle UID get/post/delete
      const uid = event.pathParameters.uid;
      const body = JSON.parse(event.body);
      if (event.httpMethod === 'GET') {
        const principles = await getPrinciplesByUid(uid);
        payload = { principles };
      } else if ((event.httpMethod === 'POST' & body.principles)) {
        console.log('in the post');
        const addResult = await addPrinciples(uid, body.principles);
        payload = { addResult, body };
      }
    }

    responseBody = {
      event,
      payload
    };
  } catch (err) {
    responseCode = 404;
    responseBody = { error: err };
  }

  // For base64-encoded payload, you must also
  // set the 'isBase64Encoded' property to 'true'.
  const response = {
    statusCode: responseCode,
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

const addPrinciples = async (uid, principlesList) => {
  // TODO: check if principles list is array. also needs to be adjusted on GUI!!
  const inputArray = principlesList.map((entry, key) => {
    return new Principle({
      content: entry.content,
      owner: uid
    });
  });
  console.log('adding principles', inputArray);
  const result = await Principle.collection.insertMany(inputArray);
  return result;
};
