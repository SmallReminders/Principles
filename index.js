'use strict';
// var MongoClient = require('mongodb').MongoClient;
// let atlasConnectionUri;
// let cachedDb = null; // will be cached for the duration of underlying container for this function
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// const Principle = mongoose.model('Principle');

// function processEvent (event, context, callback) {
//   console.log('Calling MongoDB Atlas from AWS Lambda with event: ' + JSON.stringify(event));
// }

exports.handler = async (event, context, callback) => {
  // var uri = process.env.MONGODB_ATLAS_CLUSTER_URI;
  // if (atlasConnectionUri != null) {
  //   processEvent(event, context, callback);
  // } else {
  //   atlasConnectionUri = uri;
  //   console.log('the Atlas connection string is ' + atlasConnectionUri);
  //   processEvent(event, context, callback);
  // }

  let name = 'you';
  let city = 'World';
  let time = 'day';
  let day = '';
  const responseCode = 200;
  console.log('request: ' + JSON.stringify(event));

  if (event.queryStringParameters && event.queryStringParameters.name) {
    console.log('Received name: ' + event.queryStringParameters.name);
    name = event.queryStringParameters.name;
  }

  if (event.queryStringParameters && event.queryStringParameters.city) {
    console.log('Received city: ' + event.queryStringParameters.city);
    city = event.queryStringParameters.city;
  }

  if (event.headers && event.headers.day) {
    console.log('Received day: ' + event.headers.day);
    day = event.headers.day;
  }

  if (event.body) {
    const body = JSON.parse(event.body);
    if (body.time) {
      time = body.time;
    }
  }

  let greeting = `Good ${time}, ${name} of ${city}.`;
  if (day) greeting += ` Happy happy ${day}!`;

  const responseBody = {
    message: greeting,
    input: event
  };

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
