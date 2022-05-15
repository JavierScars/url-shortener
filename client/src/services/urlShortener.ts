import { IGetHashResponse, IShortenUrlResponse } from "../interfaces/ServerResponse";

export const getHash = async (url: string): Promise<string> => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/shorten-url`, {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await rawResponse.json() as IShortenUrlResponse;
    return data.hash
}

export const getGoUrl = async (hash: string): Promise<string> => {
    try {
        const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/get/${hash}`, {
            method: 'GET',
        })
        if (rawResponse.status < 400) {
            const data = await rawResponse.json() as IGetHashResponse;
            return data.url
        }
        return ''
    }
    catch (error) {
        console.error(error)
        return ''
    }
}