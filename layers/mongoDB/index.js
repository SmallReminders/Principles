require('dotenv').config();
require('./schema/Principle'); // mongoose schema

// Mongo setup
const mongoDB = require('./mongoDB');
mongoDB.connect();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const Principle = mongoose.model('Principle');
