import { logger } from "../winstonConfig"
import { PrismaClient } from "prisma/prisma-client"
import { OAuth2Client, TokenPayload } from "google-auth-library"
import jwt from "jsonwebtoken"
import {
  DB_New_User_Payload,
  DB_User_Return,
  Google_TokenId_Auth_Return_Data,
  Signup_Response,
  tokens_auth_refresh,
  User_Cred_for_auth_token
} from "../allTypes"

export class SignUpAndLoginClient {
    private prisma: PrismaClient = new PrismaClient()
    private googleClient: OAuth2Client = new OAuth2Client()
    private authTokenSecret: string = process.env.AUTH_TOKEN_SECRET!
    private refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET!

    protected async authenticate_user_google_tokenid (token: string):
        Promise<Google_TokenId_Auth_Return_Data> {
      try {
        const user_data_from_google_tokenId = await this.googleClient
          .verifyIdToken({
            idToken: token
          })
        if (!user_data_from_google_tokenId) {
          return { error: true }
        }
        const user_details: TokenPayload =
           user_data_from_google_tokenId.getPayload()!
        return {
          email: user_details.email as string,
          name: user_details.name as string,
          givenName: user_details.given_name as string,
          imageUrl: user_details.picture as string
        }
      } catch (err) {
        return { error: true }
      }
    }

    protected async generate_jwt_auth_token (userData: User_Cred_for_auth_token)
        : Promise<tokens_auth_refresh> {
      try {
        const auth_Token = jwt.sign(
          userData,
          this.authTokenSecret,
          {
            algorithm: "HS256",
            expiresIn: "20m"
          }
        )
        if (!auth_Token) {
          return { error: true }
        }
        return { token: auth_Token }
      } catch (err) {
        return { error: true }
      }
    }

    protected async generate_jwt_refresh_token (
      userData: User_Cred_for_auth_token
    )
        : Promise<tokens_auth_refresh> {
      try {
        const auth_Token = jwt.sign(
          userData,
          this.refreshTokenSecret,
          {
            algorithm: "HS256",
            expiresIn: "30d"
          }
        )
        if (!auth_Token) {
          return { error: true }
        }
        return { token: auth_Token }
      } catch (err) {
        return { error: true }
      }
    }

    protected async check_for_a_user_in_database_with_email (email: string)
        : Promise<User_Cred_for_auth_token> {
      try {
        const is_already_user = await this.prisma.userModel.findUnique({
          where: {
            email: email
          }
        })
        if (!is_already_user) {
          return { exists: false }
        }

        return {
          userId: is_already_user!.userId,
          name: is_already_user!.name,
          exists: true
        }
      } catch (err) {
        logger.error(`Error from check user with email ${err}`)
        return { exists: true }
      }
    }

    protected async check_for_a_user_in_database_with_userid (userid: string)
        : Promise<boolean> {
      try {
        const is_already_user = await this.prisma.userModel.findUnique({
          where: {
            userId: userid
          }
        })
        if (!is_already_user) {
          return false
        }
        return true
      } catch (err) {
        return false
      }
    }

    protected async add_new_user_in_database (userData: DB_New_User_Payload)
        : Promise<User_Cred_for_auth_token> {
      try {
        const is_user_added = await this.prisma.userModel.create({
          data: {
            email: userData.email,
            name: userData.name,
            givenName: userData.givenName,
            imageUrl: userData.imageUrl,
            isLoggedIn: userData.isLoggedIn,
            bio: userData.bio,
            address: userData.address,
            phone: userData.phone
          }
        })

        if (!is_user_added) {
          logger.error(`Add new user ${is_user_added}}`)
          return { error: true }
        }
        return {
          userId: is_user_added.userId,
          name: is_user_added.name
        }
      } catch (err) {
        logger.error(`Add new user ${err}`)
        return { error: true }
      }
    }

    protected async get_a_user_details_from_database (userId: string)
        : Promise<DB_User_Return> {
      try {
        const getUserFromDatabase = await this.prisma.userModel.findUnique({
          where: {
            userId: userId
          }
        })
        if (!getUserFromDatabase) { throw Error("Could not find such user") }

        return getUserFromDatabase as DB_User_Return
      } catch (err) {
        return { error: err as string }
      }
    }

    protected async check_and_generate_tokens_and_login_status (
      userId: string,
      name: string
    ): Promise<Signup_Response> {
      try {
        const tokenPayload: User_Cred_for_auth_token = {
          userId: userId,
          name: name
        }
        const create_jwt_token: tokens_auth_refresh = await this
          .generate_jwt_auth_token(tokenPayload)

        if (create_jwt_token.error) { throw new Error("Internal server error") }

        const create_refresh_tkn: tokens_auth_refresh = await this
          .generate_jwt_refresh_token(tokenPayload)

        if (create_refresh_tkn.error) {
          throw new Error("Internal server error")
        }

        const new_userid_and_auth_token: Signup_Response = {
          userId: userId,
          authToken: create_jwt_token.token,
          isLoggedIn: true,
          refreshToken: create_refresh_tkn.token
        }

        return new_userid_and_auth_token
      } catch (err) {
        logger.error(err)
        throw new Error(err as string)
      }
    }

    protected async generate_new_user_adding_payload (
      userData: Google_TokenId_Auth_Return_Data
    )
        : Promise<DB_New_User_Payload> {
      try {
        const new_user_payload_object: DB_New_User_Payload = {
          email: userData.email as string,
          name: userData.email as string,
          givenName: userData.givenName as string,
          imageUrl: userData.imageUrl as string,
          isLoggedIn: true,
          bio: `Hi I'm ${userData.givenName}`,
          address: "",
          phone: ""
        }
        return new_user_payload_object
      } catch (err) {
        throw new Error("Some Internal server error occured")
      }
    }
}
