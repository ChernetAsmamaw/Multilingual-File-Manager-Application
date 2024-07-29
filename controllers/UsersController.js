/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

// Controller for the users
export default class UsersController {
  // Method to create a new user
  static async postNew(req, res) {
    
    // process the request
    console.log('Request Body:', req.body);

    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }
    const user = await (await dbClient.usersCollection()).findOne({ email });

    if (user) {
      res.status(400).json({ error: 'Already exist' });
      return;
    }
    const insertionInfo = await (await dbClient.usersCollection())
      .insertOne({ email, password: sha1(password) });
    const userId = insertionInfo.insertedId.toString();

    userQueue.add({ userId });
    res.status(201).json({ email, id: userId });
  }

  // Method to get the current user
  static async getMe(req, res) {
    const { user } = req;

    res.status(200).json({ email: user.email, id: user._id.toString() });
  }

  // Method to delete a user with the given id
  static async deleteMe(req, res) {
    const { user } = req;

    await (await dbClient.usersCollection()).deleteOne({ _id: user._id });

    res.status(204).end();
  }

  // Method to list all the users
  static async getIndex(req, res) {
    const users = await (await dbClient.usersCollection()).find().toArray();

    res.status(200).json(users);
  }

  // Method to show a user with the given id
  static async getShow(req, res) {
    const { id } = req.params;
    const user = await (await dbClient.usersCollection()).findOne({ _id: dbClient.ObjectId(id) });

    if (!user) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    res.status(200).json({ email: user.email, id: user._id.toString() });
  }

}
