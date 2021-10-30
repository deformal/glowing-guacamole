export const signupQuery = `
    mutation Signup($userId: String) {
      create_a_new_account_or_login(userId: $userId){
        userId
    }
}`

export const getEverything = `
    query GetEveryThing($x: String){
        getAllBooksAndMags(x: $x){
              title
              isbn
              authors
              description_or_publishedAt
        }
    }
`
// books -----------------------------------
export const getOnlyBooks = `
    query GetAllBooks($x: String){
        getBooks(isbn: $x){
              title
              isbn
              authors
              description
        }
    }
`
export const getABookByIsbn = `
    query GetABookByIsbn($x: String!){
        getBookByIsbn(isbn: $x){
              title
              isbn
              authors
              description
        }
    }
`
export const getBooksByEmail = `
    query GetBooksByEmail($x: String!){
      getBooksByEmail(authorEmail: $x){
              title
              isbn
              authors
              description
        }
    }
`

// mags ----------------------------------------
export const getOnlyMags = `
    query GetAllMags($x: String){
        getMags(isbn: $x){
              title
              isbn
              authors
              publishedAt
        }
    }
`

export const getMagsByEmail = `
    query GetMagsByEmail($x: String!){
      getMagsByEmail(authorEmail: $x){
              title
              isbn
              authors
              publishedAt
        }
    }
`

export const getMagByIsbn = `
    query GetAMagByIsbn($x: String!){
      getMagByIsbn(isbn: $x){
              title
              isbn
              authors
              publishedAt
        }
    }
`

// everything by author email -----------
export const getAllByEmail = `
    query GetEverythingByEmail($x: String!){
      getAllByAuthorEmail(authorEmail: $x){
              title
              isbn
              authors
              description_or_publishedAt
        }
    }
`

// myFiles
export const showAllMyFiles = `
    query GetAllMyFiles($x: String) {
        showMyFiles(x: $x) {
            myBooks
            myMagazines
        }
    }
`
export const getMyBook= `
    query GetMyBook($x: String) {
        getMyBook(filename: $x) {
            isbn
            title
            authors
            description
        }
    }
`
export const getMyMag= `
    query GetMyMag($x: String) {
        getMyMag(filename: $x) {
            isbn
            title
            authors
            publishedAt
        }
    }
`
// adding -------------------------------------------------------

export const addNewBook= `
    mutation CreateNewBook(
         $a: String!,
         $b: String!,
         $c: String!,
         $d: String!
        ) {
        addNewBook(
            filename: $a,
            title: $b,
            authors: $c,
            description: $d
            ) {
           status
        }
    }
`

export const addNewMag= `
    mutation CreateNewMag(
         $a: String!,
         $b: String!,
         $c: String!,
         $d: String!
        ) {
        addNewMag(
            filename: $a,
            title: $b,
            authors: $c,
            publishedAt: $d
            ) {
           status
        }
    }
`

// delete---------------------------------------------------

export const deleteMyBook= `
    mutation DeleteMyBook($a: String!) {
        deleteMyBook(
            filename: $a
            ) {
           status
        }
    }
`

export const deleteMyMag= `
    mutation DeleteMyMag($a: String!) {
        deleteMyMag(
            filename: $a
            ) {
           status
        }
    }
`
