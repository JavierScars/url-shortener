import { IUser } from "./User";

export interface IShortenURL {
    hash: string
    url: string
    createdAt?: Date
    id: number
    user?: IUser
    userId: number | null
    visitCount: number
}