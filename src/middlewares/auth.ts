import { AuthenticationError } from "apollo-server-errors"
import { MiddlewareFn } from "type-graphql"
import { Context } from "../allTypes"
import { SignUpAndLoginClient } from "../functions/signup-login-db"
import jwks from "jwks-rsa"
import expressJwt from "express-jwt"
import axios from "axios"
import { Request } from "express"

const snpClient = new SignUpAndLoginClient()

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  try {
    const user = context.req.user
    if (user) {
      const isValidUser = await
        snpClient.check_for_a_user_in_database_with_email((user as any).email)

      if (!isValidUser) {
        throw new Error("Not a valid user/ Try different account")
      }
      await next()
    } else {
      throw new
        AuthenticationError("You are not authorized for to perform this action")
    }
  } catch (err) {
    const error = new Error()
    error.name = "EXPIRED/MALFORMED"
    error.message = "Auth token expired"
    throw error
  }
}

export const jwtCheckMiddleware = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI!
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER_URI,
  algorithms: ["RS256"],
  credentialsRequired: false
})

export const correctUserInfo = async (req: Request) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    const response = await axios
      .get(process.env.AUTH0_ISSUER_USERINFO_URI as string, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    const userInfo = await response.data
    req.user = userInfo
    return true
  } catch (err) {
    return false
  }
}
