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
import i18nMiddleware from '../middlewares/i18n.js';




// Inject the routes with their handlers to the given express app
const injectRoutes = (api) => {

  // Apply the translation middleware to the API
  api.use(i18nMiddleware);

  // Home route: with translatable welcome message    
  api.get('/', (req, res) => {
    res.json({
      message: req.t('welcome')
    });
  });

  // routes for checking the status and stats of the API
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);

  // routqes for adding and retrieving user data, and deleting a given user
  api.post('/users', UsersController.postNew);
  api.get('/users/me', xTokenAuthenticate, UsersController.getMe);
  api.delete('/users/me', xTokenAuthenticate, UsersController.deleteMe);
  api.get('/users', xTokenAuthenticate, UsersController.getIndex);
  api.get('/users/:id', xTokenAuthenticate, UsersController.getShow);


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
  api.delete('/files/:id', xTokenAuthenticate, FilesController.deleteFile);


  // api.all is used to catch all the other routes that are not defined
  api.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });

  api.use(errorResponse);
}

// Export the router
export default injectRoutes;