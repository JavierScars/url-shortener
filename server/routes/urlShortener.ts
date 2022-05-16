import { Router, Request, Response, NextFunction } from "express";
import { LinkShortener, isValidURL } from '../utils/urlShortener';
import { PrismaClient } from '@prisma/client';
import { IGetAllUrlsResponse, IGetHashResponse, IServerError, IShortenUrlResponse } from "../interfaces/ServerResponse";

const prisma = new PrismaClient();
const router = Router();

router.post('/shorten-url', async (req: Request, res: Response<IShortenUrlResponse>, next: NextFunction) => {
    const { url, customUrl } = req.body;
    if (!isValidURL(url)) {
        const error: IServerError = {
            status: 400,
            message: 'Invalid URL',
        }
        return next(error)
    }
    const shortenUrl = new LinkShortener(url);
    const customCode = (req.user?.username && customUrl) || null;
    await prisma.shortenedUrl.create({
        data: {
            hash: shortenUrl.hash,
            url: shortenUrl.url,
            username: req.user?.username || null,
            customCode: customCode || null,
        }
    })
    res.status(201).send({
        hash: shortenUrl.hash,
        url: shortenUrl.url,
        shortenUrl: shortenUrl.getShortenedLink(),
        customCode: customCode || null,
        username: req.user?.username || null,
    });
})

router.get(['/get/:hash', '/:username/:customCode'], async (req: Request, res: Response<IGetHashResponse>, next: NextFunction) => {
    const { hash, username, customCode } = req.params;
    if (hash?.length < 4 || (!username || !customCode)) {
        return next()
    }
    let shortenedUrl = null
    if (username && customCode) {
        shortenedUrl = await prisma.shortenedUrl.findUnique({
            where: {
                custom_code_username_unique: {
                    username,
                    customCode,
                }
            }
        })
    }
    else {
        shortenedUrl = await prisma.shortenedUrl.findUnique({
            where: {
                hash: hash
            }
        })
    }

    if (shortenedUrl) {
        res.json({
            url: shortenedUrl.url,
            hash: shortenedUrl.hash
        });
        return prisma.shortenedUrl.update({
            where: {
                hash: shortenedUrl.hash
            },
            data: {
                visitCount: shortenedUrl.visitCount + 1
            }
        })
    }
    return next()
})

router.get('/get-all-urls', async (req: Request, res: Response<IGetAllUrlsResponse>, next: NextFunction) => {
    if (!req.user) {
        const error: IServerError = {
            status: 401,
            message: 'Unauthorized',
        }
        return next(error)
    }
    const URLs = await prisma.shortenedUrl.findMany({
        where: {
            username: req.user?.username || null
        }
    })
    return res.json({ URLs })
})
export default router;