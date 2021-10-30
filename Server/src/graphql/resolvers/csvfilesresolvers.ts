import "reflect-metadata"
import { logger } from "../../winstonConfig"
import { isAuth } from "../../middlewares/auth"
import {
  AllReturn
  , Book as Books
  , DeleteBookMagReturn
  , Mag as Mags
  , MyFiles
  , NewBookMagReturn
} from "../typeDefs"
import { BooksAndMagsClient } from "../../functions/books-mags-funcs"
import { v4 as uuid } from "uuid"
import {
  Arg,
  Mutation,
  Query,
   Resolver,
  UseMiddleware
} from "type-graphql"

import {
  Book,
  Mag,
  Error,
  Combined,
  MyFilesReturn,
  NewBookMagReturnT
} from "../../allTypes"

@Resolver()
export class BooksResolver extends BooksAndMagsClient {
    @Query(returns => [AllReturn])
    @UseMiddleware(isAuth)
  private async getAllBooksAndMags (
    @Arg("x", { nullable: true }) x: string
  ):Promise<Array<Combined>> {
    try {
      const response = await this.get_all_books_mags()
      if ((response as Error).error) {
        throw new Error("Internal server error occured/Try again")
      }
      return response as Array<Combined>
    } catch (err) {
      throw new Error("Internal server error")
    }
  }

  // books
  @Query(returns => [Books])
  @UseMiddleware(isAuth)
    private async getBooks (
    @Arg("isbn", { nullable: true }) isbn: string
    ): Promise<Array<Book>> {
      try {
        const response = await this.get_books_from_file(isbn)
        if ((response as Error).error) {
          throw new Error("Internal server error occured/Try again")
        }
        return response as Array<Book>
      } catch (err) {
        logger.error(err)
        throw new Error("Internal server error")
      }
    }

  @Query(returns => [Books])
  @UseMiddleware(isAuth)
  private async getBookByIsbn (
    @Arg("isbn", { nullable: false }) isbn: string
  ): Promise<Array<Book>> {
    try {
      const response = await this.get_book_from_file_by_isbn(isbn)
      if (!response) {
        throw new Error("Internal server error occured/Try again")
      }
      return response as Array<Book>
    } catch (err) {
      logger.error(err)
      throw new Error("Internal server error")
    }
  }

  @Query(returns => [Books])
  @UseMiddleware(isAuth)
  private async getBooksByEmail (
    @Arg("authorEmail", { nullable: false }) authorEmail: string
  ): Promise<Array<Book>> {
    try {
      const response = await this.get_all_books_by_author_email(authorEmail)
      if ((response as Error).error) {
        throw new Error("Internal server error occured/Try again")
      }
      return response as Array<Book>
    } catch (err) {
      logger.error(err)
      throw new Error("Internal server error")
    }
  }

  // Mags
  @Query(returns => [Mags])
  @UseMiddleware(isAuth)
  private async getMags (
  @Arg("isbn", { nullable: true }) isbn: string
  ): Promise<Array<Mag>> {
    try {
      const response = await this.get_mags_from_file(isbn)
      if (!response) {
        throw new Error("Internal server error occured/Try again")
      }
      return response as Array<Mag>
    } catch (err) {
      logger.error(err)
      throw new Error("Internal server error")
    }
  }

  @Query(returns => [Mags])
  @UseMiddleware(isAuth)
  private async getMagByIsbn (
  @Arg("isbn", { nullable: false }) isbn: string
  ): Promise<Array<Mag>> {
    try {
      const response = await this.get_mag_from_file_by_isbn(isbn)
      if (!response) {
        throw new Error("Internal server error occured/Try again")
      }
      return response as Array<Mag>
    } catch (err) {
      logger.error(err)
      throw new Error("Internal server error")
    }
  }

  @Query(returns => [Mags])
  @UseMiddleware(isAuth)
  private async getMagsByEmail (
    @Arg("authorEmail", { nullable: false }) authorEmail: string
  ): Promise<Array<Mag>> {
    try {
      const response = await this.get_all_mags_by_author_email(authorEmail)
      if ((response as Error).error) {
        throw new Error("Internal server error occured/Try again")
      }

      return response as Array<Mag>
    } catch (err) {
      logger.error(err)
      throw new Error("Internal server error")
    }
  }

  // everythingByAuthorEmail
  @Query(returns => [AllReturn])
  @UseMiddleware(isAuth)
  private async getAllByAuthorEmail (
    @Arg("authorEmail", { nullable: false }) authorEmail: string
  ) {
    try {
      const response = await this.get_everything_by_author_email(authorEmail)
      if ((response as Error).error) {
        throw new Error("Internal server error occured/Try again")
      }
      return response
    } catch (err) {
      logger.error(err)
      throw new Error("Internal server error")
    }
  }

  // myfiles
   @Query(returns => MyFiles)
   @UseMiddleware(isAuth)
  private async showMyFiles (
    @Arg("x", { nullable: true }) x: string
  ): Promise<MyFilesReturn> {
    try {
      const myFiles = await this.check_myFiles()
      if ((myFiles as Error).error) {
        throw new Error("Internal server error occured")
      }
      return myFiles
    } catch (err) {
      console.error(err)
      logger.error(err)
      throw new Error("Internal server error")
    }
  }

  @Query(returns => [Books])
  @UseMiddleware(isAuth)
   private async getMyBook (
   @Arg("filename", { nullable: false }) filename: string
   ): Promise<Array<Book>> {
     try {
       const bookData: Array<Book> | Error = await this
         .get_my_Book_data(filename)

       if ((bookData as unknown as Error).error) {
         throw new Error("An Internal server error occured")
       }
       return bookData as Array<Book>
     } catch (err) {
       console.error(err)
       logger.error(err)
       throw new Error("Internal server error")
     }
   }

   @Query(returns => [Mags])
   @UseMiddleware(isAuth)
  private async getMyMag (
    @Arg("filename", { nullable: false }) filename: string
  ): Promise<Array<Mag>> {
    try {
      const magData: Array<Mag> | Error = await this
        .get_my_Mag_data(filename)

      if ((magData as unknown as Error).error) {
        throw new Error("An Internal server error occured")
      }
      return magData as Array<Mag>
    } catch (err) {
      console.error(err)
      logger.error(err)
      throw new Error("Internal server error")
    }
  }

   // mutations
  @Mutation(returns => NewBookMagReturn)
  @UseMiddleware(isAuth)
   private async addNewBook (
     @Arg("filename") filename: string,
     @Arg("title") title: string,
     @Arg("authors") authors: string,
     @Arg("description") description: string
   ): Promise<NewBookMagReturnT> {
     try {
       const bookArray:Array<Book> = [
         {
           title,
           isbn: uuid(),
           authors,
           description
         }
       ]
       const adddingNewBook = await this.add_newFile1(bookArray, filename)
       if (!adddingNewBook) {
         throw new Error("Internal server error occured")
       }
       return { status: true }
     } catch (err) {
       console.error(err)
       logger.error(err)
       throw new Error("Internal server error occured")
     }
   }

   @Mutation(returns => NewBookMagReturn)
  @UseMiddleware(isAuth)
  private async addNewMag (
     @Arg("filename") filename: string,
     @Arg("title")title: string,
     @Arg("authors") authors: string,
     @Arg("publishedAt") publishedAt: string
  ): Promise<NewBookMagReturnT> {
    try {
      const magArray:Array<Mag> = [
        {
          title,
          isbn: uuid(),
          authors,
          publishedAt
        }
      ]
      const adddingNewMag = await this.add_newFile2(magArray, filename)
      if (!adddingNewMag) {
        throw new Error("Internal server error occured")
      }
      return {
        status: true
      }
    } catch (err) {
      console.error(err)
      logger.error(err)
      throw new Error("Internal server error occured")
    }
  }

  @Mutation(returns => DeleteBookMagReturn)
  @UseMiddleware(isAuth)
   private async deleteMyBook (
     @Arg("filename") filename: string
   ): Promise<boolean> {
     try {
       const deletingBook = await this.delete_my_book(filename)
       if (!deletingBook) {
         throw new Error("Internal server error occured")
       }
       return true
     } catch (err) {
       console.error(err)
       logger.error(err)
       throw new Error("Internal server error occured")
     }
   }

   @Mutation(returns => DeleteBookMagReturn)
  @UseMiddleware(isAuth)
  private async deleteMyMag (
     @Arg("filename") filename: string
  ): Promise<boolean> {
    try {
      const deletingMag = await this.delete_my_mag(filename)
      if (!deletingMag) {
        throw new Error("Internal server error occured")
      }
      return true
    } catch (err) {
      console.error(err)
      logger.error(err)
      throw new Error("Internal server error occured")
    }
  }
}
