import { IShortenURL } from "./UrlShortener";

type ServerResponse = 200 | 400 | 401 | 403 | 404 | 409 | 500;

export interface IServerError {
    message: string;
    status: ServerResponse;
}

export interface IShortenUrlResponse {
    url: string;
    hash: string;
    shortenUrl: string;
}

export interface IGetHashResponse {
    url: string;
    hash: string;
}

export interface IGetAllUrlsResponse {
    URLs: IShortenURL[];
}


export interface ISignInUserResponse {
    username: string;
    id?: number;
}

export interface IPostGetUserResponse {
    username: string
    id?: number
}