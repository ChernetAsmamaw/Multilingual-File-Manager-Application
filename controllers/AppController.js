/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

// Class for AppController
export default class AppController {
  // Returns the status of the API (redis and db)
  static getStatus(req, res) {
    res.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
    }
  // Returns the stats of the API (number of users and files in DB)
  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      });
    }
}
