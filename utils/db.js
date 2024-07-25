/* eslint-disable-next-line no-unused-vars */

// Import the mongodb module
import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader.js';


// Class representing a mongodb client
class DBClinet {
  // create a new instance of DBClinet
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }
  
  // Check if the client is connected to the database
  isAlive() {
    return this.client.isConnected();
  }

  // Retrieve the number (promise) of users in a collection
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Retrieve the number (promise) of files in a collection
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

// Export the DBClinet class
export const dbClient = new DBClinet();
export default dbClient;
