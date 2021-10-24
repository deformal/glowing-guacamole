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
  , Google_TokenId_Auth_Return_Data
  , User_Cred_for_auth_token
  , DB_User_Return
  , Context
} from "../../allTypes"

@Resolver(User)
export class SignupAndLoginResolver extends SignUpAndLoginClient {
  private async user_continue_value_returner (userId: string, name: string) {

  }

    // queries GET_USER_DETAILS
    @Query(returns => User)
    @UseMiddleware(isAuth)
  private async get_user_details (
        @Arg("userId", {
          nullable: true
        }) userId: string,
        @Ctx() context: Context
  ): Promise<DB_User_Return> {
    try {
      const finalId: string = userId || (context.req.user as any).userId
      const getUserDetails: DB_User_Return = await this.get_a_user_details_from_database(finalId)

      if (getUserDetails.error) { throw new Error(getUserDetails.error) }

      return getUserDetails
    } catch (err) {
      logger.error(err)
      throw new Error(err as string)
    }
  }

    // mutation SIGNUP_OR_CONTINUE
    @Mutation(returns => Signup_Return)
    private async create_a_new_account (
        @Arg("token") token: string,
        @Ctx() context: Context
    )
        : Promise<Signup_Response | ForbiddenError | UserInputError | AuthenticationError> {
      try {
        const userDataFromGoogleToken: Google_TokenId_Auth_Return_Data = await this
          .authenticate_user_google_tokenid(token)

        if (userDataFromGoogleToken.error) { throw new UserInputError("Invalid Token Received./ Invalid user email") }

        const is_existing_user: User_Cred_for_auth_token = await this
          .check_for_a_user_in_database_with_email(
                    userDataFromGoogleToken.email as string
          )

        // old user
        if (is_existing_user.exists) {
          const auth_token_userId_name = await this
            .check_and_generate_tokens_and_login_status(
                        is_existing_user.userId!,
                        is_existing_user.name!
            )

          context.res.header("Authorization", `Bearer ${auth_token_userId_name.authToken}`)
          context.res.cookie(
            "reftkn"
            , auth_token_userId_name.refreshToken
            , {
              httpOnly: true,
              sameSite: true,
              path: "/"
            })
          return {
            userId: auth_token_userId_name.userId,
            isLoggedIn: auth_token_userId_name.isLoggedIn,
            authToken: auth_token_userId_name.authToken
          }
        }
        // new user
        const new_user_payload = await this
          .generate_new_user_adding_payload(userDataFromGoogleToken)

        const create_new_user: User_Cred_for_auth_token = await this
          .add_new_user_in_database(new_user_payload)

        if (create_new_user.error) { throw new Error(`Couldn't create the new user. Reason ${create_new_user}`) }

        const auth_token_userId_name = await this
          .check_and_generate_tokens_and_login_status(
                    create_new_user.userId!
                    , create_new_user.name!
          )

        // context.res.header('Access-Control-Allow-Origin', context.req.header('origin'));
        context.res.header("Authorization", `Bearer ${auth_token_userId_name.authToken}`)
        context.res.cookie("reftkn"
          , auth_token_userId_name.refreshToken
          , {
            httpOnly: true,
            sameSite: true,
            path: "/"
          })

        return {
          userId: auth_token_userId_name.userId,
          isLoggedIn: auth_token_userId_name.isLoggedIn
        }
      } catch (err) {
        logger.error(err)
        throw new Error(err as string)
      }
    }
}
