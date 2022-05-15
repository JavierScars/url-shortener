import { IPostGetUserResponse, ISignInUserResponse } from "../interfaces/ServerResponse";

export const signin = async (username: string, password: string): Promise<ISignInUserResponse | null> => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signin`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (rawResponse.status < 400) {
        const data = await rawResponse.json() as ISignInUserResponse;
        return data
    }
    return null
}


export const signup = async (hash: string): Promise<IPostGetUserResponse | null> => {
    try {
        const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signin/${hash}`, {
            method: 'POST',
        })
        if (rawResponse.status < 400) {
            const data = await rawResponse.json() as IPostGetUserResponse;
            return data
        }
        return null
    }
    catch (error) {
        console.error(error)
        return null
    }
}