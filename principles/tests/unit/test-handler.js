'use strict';
const AWS = require('aws-sdk');

const client = AWS.Lambda.
console.log(client);
// const apiGateway = new AWS.APIGateway();
// console.log('apiGateway', apiGateway);

const test = async () => {
  const result = await apiGateway.makeRequest({
    operation: 'GET'
  });
  console.log('uhh testing');
  // console.log(result);
  return result;
};

// test();
// testing 3 things:
// 1. env is not empty
// 2. if no uid given, we get back default principles
// 3. if uid is given, we get back principles with the owner

// const app = require('../../app.js');
// const chai = require('chai');
// const expect = chai.expect;
// var event, context;

// describe('Tests index', function () {
//   it('verifies successful response', async () => {
//     const result = await app.lambdaHandler(event, context);
//     expect(result).to.be.an('object');
//     expect(result.statusCode).to.equal(200);
//     expect(result.body).to.be.an('string');

//     const response = JSON.parse(result.body);

//     expect(response).to.be.an('object');
//     expect(response.message).to.be.equal('hello world');
//     // expect(response.location).to.be.an("string");
//   });
// });
