const { MongoClient } = require('mongodb');

const dbUrl = 'mongodb+srv://mongo_user_1:v0uvIH01Be04UE5K@mongonode-0.an8z1gw.mongodb.net/Stars?retryWrites=true&w=majority';
const dbName = 'Stars';



async function connectToDatabase() {
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('notes');
    return collection;
}


module.exports = connectToDatabase;