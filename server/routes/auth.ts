import { NextFunction, Request, Response, Router } from 'express'
import { IPostGetUserResponse, IServerError, ISignInUserResponse } from '../interfaces/ServerResponse';
import { createUser } from '../services/users';
import passport from 'passport'
import { PrismaErrorCodes } from '../const/prismaErrorCodes';

const router = Router();

router.post('/signup', async (req: Request, res: Response<ISignInUserResponse>, next: NextFunction) => {
    try {
        const { password, username } = req.body;
        if (!password || !username) {
            const error: IServerError = {
                status: 400,
                message: 'Please provide all required fields'
            }
            return next(error);
        }
        const user = await createUser({ username, password });
        if (!user) {
            const error: IServerError = {
                status: 500,
                message: 'Error creating user'
            }
            return next(error);
        }
        return next()
    }
    catch (err: any) {
        const error: IServerError = {
            status: 500,
            message: err.message || 'Internal server error',
        }

        if (err.code === PrismaErrorCodes.UniqueConstraintError) {
            if (err.meta?.target.includes('username')) {
                error.message = 'Username already exists'
                error.status = 409
            }
            else {
                error.message = 'Something went wrong'
            }
        }
        return next(error);
    }
},
    passport.authenticate('local', { successRedirect: '/get-user' })),

    router.post('/signin', passport.authenticate('local', {
        successRedirect: '/get-user'
    }))

router.get('/signout', async (req: Request, res: Response,) => {
    req.logOut()
    return res.send()
})

router.get('/get-user', (req: Request, res: Response<IPostGetUserResponse>, next: NextFunction) => {
    if (req.user) {
        const { password, ...response } = req.user;
        res.json(response);
    }
    else {
        const error: IServerError = {
            status: 401,
            message: 'Unauthorized'
        }
        return next(error);
    }
})

export default router;