/**
 * FunctionName = addPrinciple
 */
let response;

/*
 * Dependencies
 */
require('dotenv').config();
require('custom/mongoDB/schema/Principle'); // mongoose schema

// Mongo setup
const mongoDB = require('custom/mongoDB');
mongoDB.connect();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Principle = mongoose.model('Principle');

exports.lambdaHandler = async (event, context) => {
  try {
    let payload;
    // must give uid, and body must have content
    // if (!event.pathParameters || !('uid' in event.pathParameters)) {
    // // if no uid given, return error
    //   throw error 
    // }

    response = {
      statusCode: 200,
      body: JSON.stringify({
        payload,
        message: 'hello from POST (addPrinciple)'
      })
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
