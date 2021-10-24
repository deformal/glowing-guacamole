import { Request, Response } from "express"

export type TestingUser = {
    id?: string,
    name: string,
    email: string,
}

export type User_Cred_for_auth_token = {
    userId?: string,
    name?: string,
    exists?: boolean,
    error?: boolean
}

export type User_Cred_for_context = {
    userId: string,
    name: string,
}

export type tokens_auth_refresh = {
    token?: string,
    error?: boolean
}

export type Google_TokenId_Auth_Return_Data = {
    email?: string,
    name?: string,
    givenName?: string,
    imageUrl?: string,
    error?: boolean
}

export type DB_New_User_Payload = {
    userId?: string,
    email: string,
    name: string,
    givenName: string,
    isLoggedIn: boolean,
    imageUrl: string,
    bio?: string,
    address?: string,
    phone?: string
}

export type DB_User_Return = {
    id?: number,
    userId?: string,
    email?: string,
    name?: string,
    givenName?: string,
    isLoggedIn?: boolean,
    imageUrl?: string,
    bio?: string,
    address?: string,
    phone?: string,
    createdAt?: Date
    updatedAt?: Date,
    error?: string
}

export type Signup_Return = {
    userId?: string,
    authToken?: string,
    refreshToken?: string,
    isLoggedIn?: boolean,
    error?: string
}

export type Returned_Error_Message = {
    message: string
}

export type Signup_Response = {
    userId?: string,
    authToken?: string,
    isLoggedIn?: boolean,
    error?: string,
    refreshToken?: string,
}

export type User_Data = {
    id?: number,
    userId?: string,
    email?: string,
    name?: string,
    givenName?: string,
    isLoggedIn?: boolean,
    imageUrl?: string,
    bio?: string,
    address?: string,
    phone?: string,
    createdAt?: Date
    updatedAt?: Date,
}

export type Context = {
    req: Request,
    res: Response
}
