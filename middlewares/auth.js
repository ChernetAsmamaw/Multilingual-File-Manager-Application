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


/* Language middleware: sets the language of the request
const fs = require('fs');
const path = require('path');

export const loadTranslations = (req, res, next) => {
  const language = req.headers['accept-language'] || 'en';
  req.language = language.split(',')[0];

  // Load the appropriate translation file
  const localesDir = path.join(__dirname, '../locales');
  const langFile = `${req.language}.json`;

  try {
    const translations = fs.readFileSync(path.join(localesDir, langFile), 'utf-8');
    req.translations = JSON.parse(translations);
  } catch (err) {
    // Fallback to English if the file is not found
    const translations = fs.readFileSync(path.join(localesDir, 'en.json'), 'utf-8');
    req.translations = JSON.parse(translations);
  }

  next();
};*/
