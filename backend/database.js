const { MongoClient } = require('mongodb');

const dbUrl = process.env.CONNECTIONSTRING;
const dbName = process.env.COLLECTION;



async function connectToDatabase() {
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('submissions');
    return collection;
}

module.exports = connectToDatabase;