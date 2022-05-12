import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express, { Express } from 'express';
import bodyParser from 'body-parser'
import routers from './routes';

export const app: Express = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json({ limit: '100kb' }));
app.use(routers)

if (process.env.NODE_ENV != 'test') {
  app.listen(port, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${port}`);
  });
}