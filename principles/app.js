/**
 * FunctionName = Principles
 */
let response;

/*
 * Dependencies
 */
require('dotenv').config();
require('custom/mongoDB/schema/Principle'); // mongoose schema
const defaultPrinciples = require('./const/sample');

// Mongo setup
const mongoDB = require('custom/mongoDB');
mongoDB.connect();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Principle = mongoose.model('Principle');

exports.lambdaHandler = async (event, context) => {
  try {
    let payload;
    if (!event.pathParameters || !('uid' in event.pathParameters)) {
      // if no uid given, return default principles
      console.log('no uid given, returning default principles');
      payload = { principles: defaultPrinciples };
    } else {
      const owner = event.pathParameters.uid;
      const query = {
        owner
      };
      const principles = await Principle.find(query);
      payload = { principles, owner };
    }
    response = {
      statusCode: 200,
      body: JSON.stringify({
        payload,
        message: 'hello from GET (Principle)',
        event
      })
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
