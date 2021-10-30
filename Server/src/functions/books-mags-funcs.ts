import csvtojson from "csvtojson"
import { createObjectCsvWriter } from "csv-writer"
import { logger } from "../winstonConfig"
import { Book, Mag, Error, Combined, NewFile } from "../allTypes"
import { CSVParseParam } from "csvtojson/v2/Parameters"
import path from "path"
import { isEmptyDir, files, remove } from "@supercharge/fs"

export class BooksAndMagsClient {
  private csvjsonopsBooksWithMags: Partial<CSVParseParam> = {
    noheader: false,
    trim: true,
    output: "json",
    checkType: true,
    headers: ["title", "isbn", "authors", "description_or_publishedAt"]
  }

  private csvjsonopsBooks: Partial<CSVParseParam> = {
    noheader: false,
    trim: true,
    output: "json",
    checkType: true,
    headers: ["title", "isbn", "authors", "description"]
  }

  private csvjsonopsMags: Partial<CSVParseParam> = {
    noheader: false,
    trim: true,
    output: "json",
    checkType: true,
    headers: ["title", "isbn", "authors", "publishedAt"]
  }

  private path1 = path.resolve(__dirname, "../Files/books.csv")
  private path2 = path.resolve(__dirname, "../Files/magazines.csv")
  private path3 = path.resolve(__dirname, "../Files/myBooks/")
  private path4 = path.resolve(__dirname, "../Files/myMagazines/")

  protected async get_all_books_mags ()
  :Promise<Array<Combined> | Error> {
    try {
      const json_data_books = await csvtojson(
        this.csvjsonopsBooksWithMags
      ).fromFile(this.path1)

      const json_data_mags = await csvtojson(
        this.csvjsonopsBooksWithMags
      ).fromFile(this.path2)

      const joinedArray = json_data_books.concat(json_data_mags)
      const sortedArray = joinedArray
        .sort((el, b) => el.title.length - b.title.length)
      const finalArray = sortedArray.splice(2)
      return finalArray
    } catch (err) {
      console.error(err)
      return {
        error: true
      }
    }
  }

  protected async get_book_from_file_by_isbn (isbn: string)
  : Promise<Array<Book> | Error> {
    try {
      const json_data = await csvtojson(
        this.csvjsonopsBooks
      ).fromFile(this.path1)
      const response = json_data
      const final_data = response.splice(1)
      const filtered_data = final_data
        .filter(el => el.isbn === isbn)
      if (filtered_data.length === 0) {
        return {
          error: true
        }
      }
      return filtered_data
    } catch (err) {
      logger.error(err)
      return {
        error: true
      }
    }
  }

  protected async get_books_from_file (isbn: string)
  : Promise<Array<Book> | Error> {
    try {
      const json_data = await csvtojson(
        this.csvjsonopsBooks
      ).fromFile(this.path1)
      const response = json_data
      const final_data = response.splice(1)
      const filtered_data = final_data
        .sort((a, b) => a.title.length - b.title.length)
      if (filtered_data.length === 0) {
        return {
          error: true
        }
      }
      return filtered_data
    } catch (err) {
      logger.error(err)
      return {
        error: true
      }
    }
  }

  protected async get_mag_from_file_by_isbn (isbn: string)
  :Promise<Array<Mag> | Error> {
    try {
      const json_data = await csvtojson(
        this.csvjsonopsMags
      ).fromFile(this.path2)
      const response = json_data
      const final_data = response.splice(1)
      const filtered_data = final_data
        .filter(el => el.isbn === isbn)
      if (filtered_data.length === 0) {
        return {
          error: true
        }
      }
      return filtered_data
    } catch (err) {
      logger.error(err)
      return {
        error: true
      }
    }
  }

  protected async get_mags_from_file (isbn: string)
  :Promise<Array<Mag> | Error> {
    try {
      const json_data = await csvtojson(
        this.csvjsonopsMags
      ).fromFile(this.path2)
      const response = json_data
      const final_data = response.splice(1)
      const filtered_data = final_data
        .sort((a, b) => a.title.length - b.title.length)
      if (filtered_data.length === 0) {
        return {
          error: true
        }
      }
      return filtered_data
    } catch (err) {
      logger.error(err)
      return {
        error: true
      }
    }
  }

  protected async get_all_books_by_author_email (email: string)
  :Promise<Array<Book> | Error> {
    try {
      const json_data = await csvtojson(
        this.csvjsonopsBooks
      ).fromFile(this.path1)
      const response = json_data
      const final_data = response.splice(1)
      const filtered_data = final_data
        .filter(el => el.authors.includes(email))
      if (filtered_data.length === 0) {
        return {
          error: true
        }
      }
      return filtered_data
    } catch (err) {
      logger.error(err)
      return {
        error: true
      }
    }
  }

  protected async get_all_mags_by_author_email (email: string)
  :Promise<Array<Mag> | Error> {
    try {
      const json_data = await csvtojson(this.csvjsonopsMags)
        .fromFile(this.path2)
      const response = json_data
      const final_data = response.splice(1)
      const filtered_data = final_data
        .filter(el => el.authors.includes(email))
      if (filtered_data.length === 0) {
        return {
          error: true
        }
      }
      return filtered_data
    } catch (err) {
      logger.error(err)
      return {
        error: true
      }
    }
  }

  protected async get_everything_by_author_email (email: string)
  :Promise<Array<Combined> | Error> {
    try {
      const json_data_books = await csvtojson(
        this.csvjsonopsBooksWithMags
      ).fromFile(this.path1)

      const json_data_mags = await csvtojson(
        this.csvjsonopsBooksWithMags
      ).fromFile(this.path2)
      const f1 = json_data_books.filter(e => e.authors.includes(email))
      const f2 = json_data_mags.filter(e => e.authors.includes(email))
      const joinedArray: Array<Combined> = f1.concat(f2)
      const sortedArray = joinedArray
        .sort((el, b) => el.title.length - b.title.length)
      return sortedArray
    } catch (err) {
      console.error(err)
      return {
        error: true
      }
    }
  }

  // adding and removing files
  protected async add_newFile1 (fileObj: Array<Book>, filename: string)
  :Promise<boolean> {
    try {
      const csvWrite = createObjectCsvWriter({
        path: `${this.path3}/${filename}.csv`,
        header: [
          { id: "title", title: "title" },
          { id: "authors", title: "authors" },
          { id: "isbn", title: "isbn" },
          { id: "description", title: "description" }],
        append: true
      })
      await csvWrite.writeRecords(fileObj)
      return true
    } catch (err) {
      logger.error(err)
      return false
    }
  }

  protected async add_newFile2 (fileObj: Array<NewFile>, filename: string)
  :Promise<boolean> {
    try {
      const csvWrite = createObjectCsvWriter({
        path: `${this.path4}/${filename}.csv`,
        append: true,
        header: [
          { id: "title", title: "title" },
          { id: "authors", title: "authors" },
          { id: "isbn", title: "isbn" },
          { id: "publishedAt", title: "publishedAt" }
        ]
      })
      await csvWrite.writeRecords(fileObj)
      return true
    } catch (err) {
      logger.error(err)
      return false
    }
  }

  protected async check_myFiles ()
  :Promise<any | Error> {
    try {
      await isEmptyDir(`${this.path3}/`)
      await isEmptyDir(`${this.path4}/`)
      const filesInit = await files(this.path3)
      const filesInit2 = await files(this.path4)
      const result = {
        myBooks: filesInit,
        myMagazines: filesInit2
      }
      return result
    } catch (err) {
      console.error(err)
      return {
        error: true
      }
    }
  }

  protected async get_my_Book_data (filename: string)
  :Promise<Array<Book> | Error> {
    try {
      const path = `${this.path3}/${filename}`
      const json_data = await csvtojson(
        this.csvjsonopsBooks
      ).fromFile(path)
      const response = json_data
      const final_data = response
      const filtered_data = final_data
        .sort((a, b) => a.title.length - b.title.length)
      if (filtered_data.length === 0) {
        return {
          error: true
        }
      }
      return filtered_data
    } catch (err) {
      console.error(err)
      logger.error(err)
      return {
        error: true
      }
    }
  }

  protected async get_my_Mag_data (filename: string)
  :Promise<Array<Mag> | Error> {
    try {
      const path = `${this.path4}/${filename}`
      const json_data = await csvtojson(
        this.csvjsonopsMags
      ).fromFile(path)
      const response = json_data
      const final_data = response
      const filtered_data = final_data
        .sort((a, b) => a.title.length - b.title.length)
      if (filtered_data.length === 0) {
        return {
          error: true
        }
      }
      return filtered_data
    } catch (err) {
      console.error(err)
      logger.error(err)
      return {
        error: true
      }
    }
  }

  protected async delete_my_book (filename: string)
  :Promise<boolean | Error> {
    try {
      const path = `${this.path3}/${filename}`
      await remove(path)
      return true
    } catch (err) {
      console.error(err)
      logger.error(err)
      return {
        error: true
      }
    }
  }

  protected async delete_my_mag (filename: string)
  :Promise<boolean | Error> {
    try {
      const path = `${this.path4}/${filename}`
      await remove(path)
      return true
    } catch (err) {
      console.error(err)
      logger.error(err)
      return {
        error: true
      }
    }
  }
}
