const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables
const { MONGO_URI, JWT_SECRET } = process.env;

let client;

async function connectToDB() {
    try {
        client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

function getClient() {
    return client;
}

module.exports = { connectToDB, getClient, JWT_SECRET };
