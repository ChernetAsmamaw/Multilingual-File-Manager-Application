/* eslint-disable import/no-named-as-default */
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis.js';

// Class for AuthController
export default class AuthController {
  // Handles the user session creation
  static async getConnect(req, res) {
    const { user } = req;
    const token = uuidv4();

    // Store the token in Redis with the userID as value and a 24h expiration time
    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    // Resolves the promise with a JSON object containing the token
    res.status(200).json({ token });
    }


  // Handles the user session termination
  static async getDisconnect(req, res) {
    const token = req.header('X-Token');

    // Delete the token from Redis
    await redisClient.del(`auth_${token}`);
    res.status(204).end();
    }
}
