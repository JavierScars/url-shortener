import { IGetAllUrlsResponse, IGetHashResponse, IShortenUrlResponse } from "../interfaces/ServerResponse";

export const getHash = async (url: string): Promise<string> => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/shorten-url`, {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    if (rawResponse.status < 400) {
        const data = await rawResponse.json() as IShortenUrlResponse;
        return data.hash
    }
    throw rawResponse.json()
}

export const getGoUrl = async (hash: string): Promise<string> => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/get/${hash}`, {
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
            return url
        })
        return data.URLs
    }
    throw rawResponse.json()
}