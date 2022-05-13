import { Router } from "express";
import bodyParser from 'body-parser'
import cors from 'cors';
import session from 'express-session'
import passport from 'passport'
import { initializePassport } from '../auth/passportConfig';
initializePassport(passport);

const router = Router()

router.use(bodyParser.json({ limit: '100kb' }));
router.use(cors());
router.use(session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize());
router.use(passport.session());

export default router;