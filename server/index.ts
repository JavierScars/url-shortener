import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express, { Express } from 'express';
import bodyParser from 'body-parser'
import routers from './routes';
import cors from 'cors';

export const app: Express = express();
const port = process.env.SERVER_PORT || 3000;
app.use(bodyParser.json({ limit: '100kb' }));
app.use(cors());
app.use(routers)

if (process.env.NODE_ENV != 'test') {
  app.listen(port, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${port}`);
  });
}