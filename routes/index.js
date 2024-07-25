// Setup express router

import express from 'express';

// Import all the controllers
import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';
import AuthController from '../controllers/AuthController.js';
import FilesController from '../controllers/FilesController.js';

// Import the middlewares
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth.js';
import { APIError, errorResponse } from '../middlewares/error.js';


// Inject the routes with their handlers to the given express app
const injectRoutes = (api) => {
  // routes for checking the status and stats of the API
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);

  // routqes for adding and retrieving user data
  api.post('/users', UsersController.postNew);
  api.get('/users/me', xTokenAuthenticate, UsersController.getMe);

  // routes for user authentication
  api.get('/connect', basicAuthenticate, AuthController.getConnect);
  api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

  // routes for file management
  api.post('/files', xTokenAuthenticate, FilesController.postUpload);
  api.get('/files/:id', xTokenAuthenticate, FilesController.getShow);
  api.get('/files', xTokenAuthenticate, FilesController.getIndex);
  api.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);
  api.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);
  api.get('/files/:id/data', FilesController.getFile);


  // api.all is used to catch all the other routes that are not defined
  api.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });

  api.use(errorResponse);
}

// Export the router
export default injectRoutes;