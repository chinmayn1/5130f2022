import { decodeToken } from 'react-jwt'

export const GetToken = () => JSON.parse(sessionStorage.getItem("user"))?.access_token

export const DecodeToken = (token) => {
    const result = decodeToken((token.startsWith("?token=") ? token.slice(token.indexOf("=") + 1) : ''));

    return result;
}