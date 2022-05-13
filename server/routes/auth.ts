import { NextFunction, Request, Response, Router } from 'express'
import { IServerError } from '../interfaces/ServerResponse';
import { createUser } from '../services/users';
import passport from 'passport'

const router = Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
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
        res.status(201).json(user);
    }
    catch (err: any) {
        const error: IServerError = {
            status: 500,
            message: err.message || 'Internal server error'
        }
        return next(error);
    }
})

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
}))

router.post('/user', (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        res.json({ ...req.user, password: undefined });
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