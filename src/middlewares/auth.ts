import { AuthenticationError } from "apollo-server-errors"
import { MiddlewareFn } from "type-graphql"
import { Context } from "../allTypes"

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  try {
    if (context.req.user) {
      await next()
    } else {
      throw new
      AuthenticationError("You are not authorized for to perform this action")
    }
  } catch (err) {
    throw new
    AuthenticationError("You are not authorized for to perform this action")
  }
}
