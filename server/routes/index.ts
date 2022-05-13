import errorsFunctions from './errors';
import urlShortenerRouter from './urlShortener';
import auth from './auth';

export default [urlShortenerRouter, auth, ...errorsFunctions];