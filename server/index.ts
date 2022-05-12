import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { LinkShortener, isValidURL } from './utils/urlShortener';
import bodyParser from 'body-parser'

import errorRouter from './routes/errors';

const prisma = new PrismaClient();
export const app: Express = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json({ limit: '100kb' }));

app.get('/', async (req: Request, res: Response) => {
  res.send('Express + TypeScript Server prisma has ' + await prisma.shortenedUrl.count() + ' shortened urls');
});

app.post('/shortenUrl', async (req: Request, res: Response, next: Function) => {
  const { url } = req.body;
  if (!isValidURL(url)) {
    next({
      status: 400,
      message: 'Invalid URL',
    })
  }
  const shortenUrl = new LinkShortener(url);
  await prisma.shortenedUrl.create({
    data: {
      hash: shortenUrl.hash,
      url: shortenUrl.url,
    }
  })
  res.send({
    hash: shortenUrl.hash,
    url: shortenUrl.url,
    shortenUrl: shortenUrl.getShortenedLink()
  });
})

app.use(errorRouter);

if (process.env.NODE_ENV != 'test') {
  app.listen(port, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${port}`);
  });
}