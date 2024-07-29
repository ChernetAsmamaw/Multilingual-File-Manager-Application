import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
