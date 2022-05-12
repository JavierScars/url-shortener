import { Router, Request, Response, NextFunction } from "express";
import { LinkShortener, isValidURL } from '../utils/urlShortener';
import { PrismaClient } from '@prisma/client';
import { ServerError } from "../interfaces/IServerResponse";

const prisma = new PrismaClient();
const router = Router();

router.post('/shorten-url', async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body;
    if (!isValidURL(url)) {
        const error: ServerError = {
            status: 400,
            message: 'Invalid URL',
        }
        return next(error)
    }
    const shortenUrl = new LinkShortener(url);
    await prisma.shortenedUrl.create({
        data: {
            hash: shortenUrl.hash,
            url: shortenUrl.url,
        }
    })
    res.status(201).send({
        hash: shortenUrl.hash,
        url: shortenUrl.url,
        shortenUrl: shortenUrl.getShortenedLink()
    });
})

router.get('/go/:hash', async (req: Request, res: Response, next: NextFunction) => {
    const { hash } = req.params;
    if (hash.length < 4) {
        return next()
    }
    const shortenedUrl = await prisma.shortenedUrl.findUnique({
        where: {
            hash: hash
        }
    })
    if (shortenedUrl) {
        if (shortenedUrl.url.slice(0, 4).includes('http')) {
            return res.status(302).redirect(shortenedUrl.url);
        }
        return res.status(302).redirect('http://' + shortenedUrl.url);
    }
    return next()
})
export default router;