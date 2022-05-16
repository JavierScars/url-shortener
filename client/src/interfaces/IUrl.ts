import { IUser } from "./User";

export interface IShortenURL {
    id: number;
    url: string;
    hash: string;
    shortenUrl: string;
    user?: IUser
    userId: string
    visitCount: number
}