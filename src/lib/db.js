import {MongoClient} from 'mongodb';
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(uri);

//connecting to mongoDB
let cachedDb = null;

export async function connectToDatabase() {
  if(cachedDb) {
    return cachedDb; //caching to avoid multiple connections
  }

  try{
    await client.connect();
    const db = client.db('trackflow');
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to the database');
  }
}