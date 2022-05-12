import { randomBytes } from 'crypto';
import { MD5, enc } from 'crypto-js';

const BASE_URL = process.env.SERVER_BASE_URL;
const HASH_LENGTH = 6;
const URL_REGEX = new RegExp(/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)$/)

// Using randomBytes instead of salts make the hash unique
// so we can have multiples short links for the same url
// otherwise each url will only have one short link
export class LinkShortener {
    hash: string
    url: string

    static gethash(text: string): string {
        // Using base64Url will make the string 'url friendly' so we can actually use it as a param
        const HASH = MD5(text + randomBytes(10))
            .toString(enc.Base64url)
            .substring(0, HASH_LENGTH);
        return HASH;
    }

    getShortenedLink(): string {
        return BASE_URL + this.hash
    }

    constructor(url: string, hash?: string) {
        this.hash = hash || LinkShortener.gethash(url)
        this.url = url
    }
}

export function isValidURL(url: string): boolean {
    return URL_REGEX.test(url)
}