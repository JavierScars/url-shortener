import { IGetAllUrlsResponse, IGetHashResponse, IShortenUrlResponse } from "../interfaces/ServerResponse";

export const getHash = async (url: string, customUrl?: string): Promise<string> => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/shorten-url`, {
        method: 'POST',
        body: JSON.stringify({ url, customUrl }),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    if (rawResponse.status < 400) {
        const data = await rawResponse.json() as IShortenUrlResponse;
        return data.customCode ? `${data.username}/${data.customCode}` : data.hash
    }
    throw rawResponse.json()
}

interface getGoUrlProps {
    username: string
    customCode: string
    hash: string
}
export const getGoUrl = async ({ username, customCode, hash }: getGoUrlProps): Promise<string> => {
    let ep = ''
    if (username && customCode) {
        ep = `${username}/${customCode}`
    }
    else if (hash) {
        ep = `get/${hash}`
    }
    if (!ep) {
        throw { status: 400, message: 'Invalid URL' }
    }

    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${ep}`, {
        method: 'GET',
        credentials: 'include'
    }
    )
    if (rawResponse.status < 400) {
        const data = await rawResponse.json() as IGetHashResponse;
        return data.url
    }
    throw rawResponse.json()
}

export const getAllUrls = async (): Promise<IShortenUrlResponse[]> => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/get-all-urls`, {
        method: 'GET',
        credentials: 'include',
    })
    if (rawResponse.status < 400) {
        const data = await rawResponse.json() as IGetAllUrlsResponse;
        data.URLs = data.URLs.map(url => {
            url.shortenUrl = `${process.env.REACT_APP_CLIENT_BASE_URL}/${url.hash}`
            if (url.customCode) {
                url.customCode = `${process.env.REACT_APP_CLIENT_BASE_URL}/${url.username}/${url.customCode}`
            }
            else {
                url.customCode = ''
            }
            return url
        })
        return data.URLs
    }
    throw rawResponse.json()
}