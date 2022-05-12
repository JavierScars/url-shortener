import { NextFunction, Request, Response } from 'express'
import { ServerError } from '../interfaces/IServerResponse'

// Not using express router so the next funcion will lead to these functions when error is detected
const notFoundError = ((_req: Request, _res: Response, next: NextFunction) => {
    const error: ServerError = {
        message: 'Not found',
        status: 404
    }
    return next(error);
});

const errorFallback = ((err: ServerError, _req: Request, res: Response, _next: NextFunction) => {
    return res.status(err.status || 500).json({
        status: err.status,
        message: err.message,
    });
});

export default [notFoundError, errorFallback]