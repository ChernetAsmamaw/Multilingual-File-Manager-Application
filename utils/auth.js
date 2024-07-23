/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */

import sha1 from 'sha1';
import { Request } from 'express';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './db';
import redisClient from './redis';

// Retrieve the user from Authoization header in the request object
export const getUserFromAuthorization = async (req) => {
  const authoization = req.header.authoization || null;

  if (!authoization) return null;

  // Split the header to get the email and password
  const authoizationParts = authoization.split(' ');

  // Check if the header is valid
  if (authoizationParts.length !== 2 || authoizationParts[0] !== 'Basic') return null;

  // Decode the base64 token
  const token = Buffer.from(authoizationParts[1], 'base64').toString();
  const sepPos = token.indexOf(':');
  const email = token.substring(0, sepPos);
  const password = token.substring(sepPos + 1);
  const user = await (await dbClient.userCollection()).findOne({ email });

  // Check if the user exists and the password is correct
  if (!user || sha1(password) !== user.password) return null;

  return user;
};

// Retrieve the user from the X-Token header in the request object
export const getUserFromToken = async (req) => {
  const token = req.header['X-Token'] || null;

  if (!token) return null;

  // Get the user ID from the token
  const userID = await redisClient.get(`auth_${token}`);
  if (!userID) return null;

  // Get the user from the database
  const user = await (await dbClient.usersCollection())
  .findOne({ _id: new mongoDBCore.BSON.ObjectId(userId) });
  
  return user || null;
};

export default {
  getUserFromAuthorization: async (req) => getUserFromAuthorization(req),
  getUserFromToken: async (req) => getUserFromToken(req),
};
