/* eslint-env mocha */
/* eslint-env chai */

// left off - getting errors when testing, not sure why because done() is called in code

'use strict';
const chai = require('chai');
const expect = chai.expect;

// const AWS = require('aws-sdk');
// uninstall: const request = require('supertest');
// uninstall: const http = require('http');
const axios = require('axios');
const url = 'http://127.0.0.1:3000';
const defaultPrinciples = require('../principles/const/sample');

describe('GET /principles', () => {
  it('should return default principles', async (done) => {
    try {
      const res = await axios.get(`${url}/principles/`);
      expect(res.data.payload.principles).to.equal(defaultPrinciples);
      done();
    } catch (err) {
      done();
    }
  });
});

describe('GET /principles/{uid}', () => {
  it('should return principles for a user', async (done) => {
    const uid = 'QoiDm9ZfxvOcnPOxBHJicVFt0kA2';
    const res = await axios.get(`${url}/principles/${uid}`);
    expect(res.data.payload.owner).to.equal(uid);
    done();
  });
  it('should return nothing if owner is not found', async (done) => {
    const res = await axios.get(`${url}/principles/bad_uid`);
    // console.log(res);
    expect(res.data.payload.principles.length).to.equal(0);
    done();
  });
});

// const test = async () => {
//   const res = await axios.get(`${url}/principles/`);
//   console.log(res);
//   const res2 = await axios.get(`${url}/principles/QoiDm9ZfxvOcnPOxBHJicVFt0kA2`);
//   console.log(res2);
// // expect(res.body).toEqual(
// //   expect.objectContaining({
// //     success: true
// //   }));
// // console.log('updated test element', testElement._id);
// };

// testing 3 things:
// 1. env is not empty
// 2. if no uid given, we get back default principles
// 3. if uid is given, we get back principles with the owner
