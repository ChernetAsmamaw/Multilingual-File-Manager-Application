/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
// Queue allows new queue creation and it's from bull library
import Queue from 'bull/lib/queue.js';
import dbClient from '../utils/db.js';

// Queue for sending email
const userQueue = new Queue('email sending');


// Class for UsersController
export default class UsersController {
  // Method to create new user
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const user = await (await dbClient.UsersCollection()).findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Insert the user into the database
    const insertInfo = await (await dbClient.UsersCollection()).insertOne({
      email,
      password: sha1(password),
    });
    const userID = insertInfo.insertedId.toString();

    // Add the user to the job queue to send an email
    userQueue.add({ userId });
    res.status(201).json({ email, id: userID });
    }

    // Method to retrieve an authenticated user's information
    static async getMe(req, res) {
      const { user } = req;

      res.status(200).json({ email: user.email, id: user._id.toString() });
    }
}

