import { logger } from "../winstonConfig"
import { PrismaClient } from "prisma/prisma-client"
import {
  Token_User_Data,
  DB_User_Return,
  User_Id,
  Error
} from "../allTypes"
import { UserInputError } from "apollo-server-errors"

const prisma: PrismaClient = new PrismaClient()

export class SignUpAndLoginClient {
  public async check_for_a_user_in_database_with_email (email: string)
        : Promise<User_Id| Error> {
    try {
      const is_already_user = await prisma.userModel.findUnique({
        where: {
          email: email
        }
      })
      if (!is_already_user) {
        return {
          error: true
        }
      }
      return {
        userId: is_already_user.userId
      }
    } catch (err) {
      logger.error(`Error from check user with email ${err}`)
      return {
        error: true
      }
    }
  }

  protected async check_for_a_user_in_database_with_userid (userid: string)
        : Promise<User_Id | Error> {
    try {
      const is_already_user = await prisma.userModel.findUnique({
        where: {
          userId: userid
        }
      })
      if (!is_already_user) {
        return {
          error: true
        }
      }
      return {
        userId: is_already_user.userId
      }
    } catch (err) {
      return {
        error: true
      }
    }
  }

  protected async add_new_user_in_database (
    userData: Token_User_Data
  ): Promise<User_Id | Error> {
    try {
      const is_user_added = await prisma.userModel.create({
        data: {
          email: userData.email,
          name: userData.name,
          given_name: userData.given_name,
          family_name: userData.family_name,
          locale: userData.locale,
          nickname: userData.nickname,
          isLoggedIn: userData.isLoggedIn,
          email_verified: userData.email_verified
        }
      })

      if (!is_user_added) {
        return {
          error: true
        }
      }

      return { userId: is_user_added.userId }
    } catch (err) {
      logger.error(`Add new user ${err}`)
      return {
        error: true
      }
    }
  }

  protected async get_a_user_details_from_database (userId: string)
        : Promise<DB_User_Return | boolean> {
    try {
      const getUserFromDatabase = await prisma.userModel.findUnique({
        where: {
          userId: userId
        }
      })
      if (!getUserFromDatabase) {
        throw new UserInputError("Could not find such user")
      }

      return getUserFromDatabase
    } catch (err) {
      logger.error(err)
      return false
    }
  }
}
