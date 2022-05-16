import bodyParser from 'body-parser'
import cors from 'cors';
import session from 'express-session'
import passport from 'passport'
import { initializePassport } from '../auth/passportConfig';
initializePassport(passport);

export default [bodyParser.json({ limit: '100kb' }),
cors({
    credentials: true,
    origin: 'http://localhost:3000'
}),
session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false
}),
passport.initialize(),
passport.session(),
];