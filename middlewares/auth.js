/* eslint-disable no-unused-vars */

// Middlewares for authentication

import { Request, Response, NextFunction } from 'express';
import { getUserFromXToken, getUserFromAuthorization } from '../utils/auth';


// Basic authentication middleware: applies basic authentication to a route
export const basicAuthenticate = async(req, res, next) => {
  const user = await getUserFromAuthorization(req);

  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  req.user = user;
  next();
};

// X-Token authentication middleware: applies x-token authentication to a route
export const xTokenAuthenticate = async(req, res, next) => {
  const user = await getUserFromXToken(req);

  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  req.user = user;
  next();
};
