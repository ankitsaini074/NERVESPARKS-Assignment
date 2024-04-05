// utils/dbUtils.js
const { MongoClient } = require('mongodb');
const { MONGO_URI } = require('../config');

let db;

// Connect to MongoDB
exports.connectToDB = async () => {
  const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

// Get MongoDB instance
exports.getDBInstance = () => db;

// More database utility functions as needed...
