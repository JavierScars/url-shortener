import { IUser } from './interfaces/User';

declare global {
    namespace Express {
        interface User extends IUser { }
    }
}