import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express, { Express } from 'express';
import routers from './routes';
import appConfig from './routes/appConfig';

export const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

app.use(appConfig);
app.use(routers)

if (process.env.NODE_ENV != 'test') {
  app.listen(port, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${port}`);
  });
}