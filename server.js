import express from 'express';
import boot from './libs/boot.js';
import routes from './routes/index.js';
import injectMiddlewares from './libs/middlewares.js';

const server = express();

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;