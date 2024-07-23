// Redis setup

import { promisify } from 'util';
import { createClient } from 'redis';

// Redis client
class RedisClient {
  // Create a new instance of RedisClient
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  // Check if the client's connection to the redis server is active
  isAlive() {
    return this.isClientConnected;
  }

  // Get the value of a key in the redis server
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }
  
  // Store a key-value pair + expiration time in the redis server
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  // Remove the value of a given key in the redis server
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

// Export the RedisClient class
export const redisClient = new RedisClient();
export default redisClient;
