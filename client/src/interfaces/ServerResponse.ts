export interface IShortenUrlResponse {
    url: string;
    hash: string;
    shortenUrl: string;
}

export interface IGetHashResponse {
    url: string;
    hash: string;
}

export interface ISignInUserResponse {
    username: string;
    id?: number;
}

export interface IPostGetUserResponse {
    username: string;
    id?: number;
}