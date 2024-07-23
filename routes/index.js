// Setup express router

import express from 'express';


function controlRouter() {
  const router = express.Router();
  app.use('/' , router);

}

export default controlRouter;