import { NextFunction, Request, Response, Router } from 'express'
import { ServerError } from '../interfaces/IServerResponse'

const router = Router()

router.use((_req: Request, _res: Response, next: NextFunction) => {
    const error: ServerError = {
        message: 'Not found',
        status: 404
    }
    return next(error);
});

router.use((err: ServerError, _req: Request, res: Response, _next: NextFunction) => {
    return res.status(err.status || 500).send({
        status: err.status,
        error: {
            message: err.message,
        }
    });
});

export default router