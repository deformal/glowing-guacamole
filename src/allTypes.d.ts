import { Request, Response } from "express"

export type DB_New_User_Payload = {
    sub?: string,
    email: string,
    email_verified: boolean,
    family_name:string,
    name: string,
    given_name: string,
    locale:string,
    nickname: string,
    picture: string,
    isLoggedIn: boolean
}

export type DB_User_Return = {
    email: string,
    name: string,
    given_name: string,
    isLoggedIn: boolean,
    picture: string,
    bio: string,
    address: string,
    locale: string,
    family_name: string,
    nickname: string,
    email_verified: boolean,
    phone: string,
    createdAt: Date
    updatedAt: Date,
}

export type Signup_Return = {
    userId?: string,
    authToken?: string,
    refreshToken?: string,
    isLoggedIn?: boolean,
    error?: string
}

export type Signup_Response = {
    userId: string
}

export type Error = {
    error: boolean
}

export type User_Id = {
    userId: string
}

export type Token_User_Data = {
    sub: string,
    email: string,
    email_verified: boolean,
    family_name:string,
    name: string,
    given_name: string,
    locale:string,
    nickname: string,
    picture: string,
    isLoggedIn?: boolean
}

export type Context = {
    req: Request,
    res: Response,
    user: Token_User_Data
}

export type Book = {
    title: string,
    isbn: string,
    authors: string,
    description: string
}

export type Author = {
    email: string,
    firstname: string,
    lastname: string,
}

export type Mag ={
    title: string,
    isbn: string,
    authors: string,
    publishedAt: string
}

export type Combined = {
    title: string,
    isbn: string,
    authors: string,
    publishedAt: string
    publishedAt_or_description?: string
}

export type NewFile = {
    title: string,
    isbn: string,
    authors: string,
    publishedAt?: string,
    description?: string
}

export type MyFilesReturn = {
    myBooks: Array<string>
    myMagazines: Array<string>
}

export type NewBookMagReturnT = {
    status: boolean
}
