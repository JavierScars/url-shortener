import { IUser } from "./User";

export interface IShortenUrlResponse {
    url: string;
    hash: string;
    shortenUrl: string;
}

export interface IGetHashResponse {
    url: string;
    hash: string;
}

export interface ISignInUserResponse extends IUser {

}

export interface IPostGetUserResponse extends IUser {

}