import { IShortenURL } from "./IUrl";
import { IUser } from "./User";

export interface IShortenUrlResponse extends IShortenURL {
}

export interface IGetHashResponse {
    url: string;
    hash: string;
}

export interface IGetAllUrlsResponse {
    URLs: IShortenURL[];
}

export interface ISignInUserResponse extends IUser {

}

export interface IPostGetUserResponse extends IUser {

}