export interface IAuth {
    email: string
    password: string
}

export interface IAuthToken {
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
    refreshTokenExpires: number
}