import { decodeToken, isExpired } from 'react-jwt'

export const GetToken = () => JSON.parse(sessionStorage.getItem("user"))?.access_token

export const DecodeToken = (token) => {
    const access = (token.startsWith("?token=") ? token.slice(token.indexOf("=") + 1) : '')
    const result = decodeToken(access);
    return result;
}