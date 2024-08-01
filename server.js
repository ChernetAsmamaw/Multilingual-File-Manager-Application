import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';
import bodyParser from 'body-parser';
import i18nMiddleware from './middlewares/i18n.js';

const server = express();

// Add the body parser middleware to the server to parse JSON request bodies
server.use(bodyParser.json());
// Apply the translation middleware to the API server to set the language of the request
server.use(i18nMiddleware);

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
