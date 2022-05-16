import { IPostGetUserResponse, ISignInUserResponse } from "../interfaces/ServerResponse";

export const signin = async (username: string, password: string): Promise<ISignInUserResponse | null> => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signin`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    if (rawResponse.status < 400) {
        const data = await rawResponse.json() as ISignInUserResponse;
        return data
    }
    if (rawResponse.status === 401) {
        throw ({ message: "User or password not valid", status: 401 })
    }
    return null
}

export const signup = async (username: string, password: string): Promise<IPostGetUserResponse | null> => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
    if (rawResponse.status < 400) {
        const data = await rawResponse.json() as ISignInUserResponse;
        return data
    }
    throw await rawResponse.json()
}

export const getUser = async (): Promise<IPostGetUserResponse | null> => {
    try {
        const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/get-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        if (rawResponse.status < 400) {
            const data = await rawResponse.json() as IPostGetUserResponse;
            return data
        }
        return null
    } catch (err) {
        return null
    }
}

export const signOut = async (): Promise<boolean> => {
    try {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/signout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        return true
    } catch (err) {
        return false
    }

}