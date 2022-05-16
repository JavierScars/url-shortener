const URL_REGEX = new RegExp(/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/)

export function isValidURL(url: string): boolean {
    return URL_REGEX.test(url)
}