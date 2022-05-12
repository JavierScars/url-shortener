import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { LinkShortener, isValidURL } from './utils/urlShortener';
import bodyParser from 'body-parser'

const prisma = new PrismaClient();
const app: Express = express();
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

app.use((_req: Request, _res: Response, next: Function) => {
  const error: ServerError = {
    message: 'Not found',
    status: 404
  }
  next(error);
});

app.use((err: ServerError, _req: Request, res: Response, next: Function) => {
  return res.status(err.status || 500).send({
    status: err.status,
    error: {
      message: err.message,
    }
  });
});

app.listen(port, () => {
  console.log(`[SERVER]: Server is running at http://localhost:${port}`);
});