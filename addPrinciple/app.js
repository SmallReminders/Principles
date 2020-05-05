// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
'use strict';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */

/*
 * Dependencies
 */
require('dotenv').config();
require('./schema/Principle'); // mongoose schema

// Mongo setup
const mongoDB = require('./utils/mongoDB');
mongoDB.connect();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Principle = mongoose.model('Principle');

exports.lambdaHandler = async (event, context) => {
  try {
    let payload;
    // if (!event.pathParameters || !('uid' in event.pathParameters)) {
    // // if no uid given, return default principles
    //   payload = { principles: defaultPrinciples };
    // }

    response = {
      statusCode: 200,
      body: JSON.stringify({
        payload,
        message: 'hello from second function'
      })
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
