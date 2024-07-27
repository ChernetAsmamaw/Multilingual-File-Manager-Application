/* eslint-disable no-unused-vars */

// Middlewares for error handling

import { Request, Response, NextFunction } from 'express';

// Represents an API error
export class APIError extends Error {
  constructor(code, message) {
    super();
    this.code = code || 500;
    this.message = message || 'Internal server error';
  }
}

// Apply basic authentication to a route
export const errorResponse = (err, req, res, next) => {
  const defaultMsg = `Failed to process ${req.url}`;

  if (err instanceof APIError) return res.status(err.code).json({ error: err.message || defaultMsg });
  
  res.status(500).json({
    error: err ? err.message || err.toString() : defaultMsg,
  });
};
