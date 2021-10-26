import "reflect-metadata"
import { logger } from "../../winstonConfig"
import { isAuth } from "../../middlewares/auth"
import { Signup_Return, User } from "../typeDefs"
import { SignUpAndLoginClient } from "../../functions/signup-login-db"

import {
  Arg
  , Ctx
  , Mutation
  , Query
  , Resolver,
  UseMiddleware
} from "type-graphql"

import {
  ForbiddenError,
  AuthenticationError,
  UserInputError
} from "apollo-server-errors"

import {
  Signup_Response
  , DB_User_Return
  , Context
  , Token_User_Data
  , Error,
  User_Id
} from "../../allTypes"

@Resolver(User)
export class SignupAndLoginResolver extends SignUpAndLoginClient {
    // queries GET_USER_DETAILS
    @Query(returns => User)
    @UseMiddleware(isAuth)
  private async get_user_details (
        @Arg("userId") userId: string
  ): Promise<DB_User_Return | boolean> {
    try {
      const getUserDetails: DB_User_Return | boolean = await this
        .get_a_user_details_from_database(userId)

      if (!getUserDetails) {
        throw new Error("Some error occued while finding the user.")
      }

      return getUserDetails
    } catch (err) {
      logger.error(err)
      throw new Error(err as string)
    }
  }

    // mutation SIGNUP_OR_CONTINUE
    @Mutation(returns => Signup_Return)
    private async create_a_new_account_or_login (
      @Ctx() context: Context,
      @Arg("userId", {
        nullable: true
      }) userId?: string
    )
        : Promise<Signup_Response
         | ForbiddenError
          | UserInputError
           | AuthenticationError> {
      try {
        const user: Token_User_Data = context.req.user as Token_User_Data
        const isUser: User_Id | Error = await this
          .check_for_a_user_in_database_with_email(user.email)
        if ((isUser as User_Id).userId) {
          return {
            userId: (isUser as User_Id).userId
          }
        }
        const saveNewUser: User_Id | Error = await this
          .add_new_user_in_database(user)

        if ((saveNewUser as Error).error) {
          throw new Error("Some internal server error/ please try again")
        }
        return {
          userId: (saveNewUser as Signup_Response).userId
        }
      } catch (err) {
        logger.error(err)
        throw new Error("Internal server error")
      }
    }
}
