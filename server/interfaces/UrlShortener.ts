import { IUser } from "./User";

export interface IShortenURL {
    hash: string
    url: string
    createdAt?: Date
    id: number
    user?: IUser
    username: string | null
    visitCount: number
    customCode: string | null
}