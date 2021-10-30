import create from "zustand";

type Mags = {
    title: string,
    isbn: string,
    authors: string,
    publishedAt?: string,
    description_or_publishedAt?:string
}

type Books = {
    title: string,
    isbn: string,
    authors: string,
    description: string
}

type BooksAndMags = {
    title: string,
    isbn: string,
    authors: string,
    description_or_publishedAt: string
}

type MyFiles = {
    myBooks: Array<string>
    myMagazines: Array<string>
}

type CacheData = {
    booksAndMags: Array<BooksAndMags>,
    onlyBooksCache: Array<Books>,
    onlyMagsCache: Array<Mags>,
    myFilesCache: Array<MyFiles>,
    cacheOnlyBooks: (data: Array<Books>) => void,
    cacheOnlyMags: (data: Array<Mags>) => void,
    cacheBooksAndMags: (data: Array<BooksAndMags>) => void,
    cacheMyFiles: (data: Array<MyFiles>) => void
}



export const cacheStore = create<CacheData>(
    (set, get) => ({
        booksAndMags: [],
        onlyBooksCache: [],
        onlyMagsCache: [],
        myFilesCache: [],
        cacheBooksAndMags: (data) =>
            set({
              booksAndMags: [...data]
            }),
        cacheOnlyBooks: (data) =>
            set({
              onlyBooksCache: [...data]
            }),
        cacheOnlyMags: (data) =>
            set({
              onlyMagsCache: [...data]
            }),
        cacheMyFiles: (data) =>
            set({
              myFilesCache: [...data]
            }),
        
    }),
)
export default cacheStore;
