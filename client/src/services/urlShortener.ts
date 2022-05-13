export const getHash = async (url: string): Promise<string> => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/shorten-url`, {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await rawResponse.json()
    return data.hash
}

export const getGoUrl = async (hash: string): Promise<string> => {
    const rawResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/go/${hash}`, {
        method: 'GET',
    })
    const data = await rawResponse.json()
    return data.url
}