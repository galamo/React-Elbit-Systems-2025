// Exercise: Interface Basics
// Complete the following tasks to practice TypeScript interfaces

/**
 * TASK 1: Define a Book Interface
 * Create an interface called 'Book' with the following properties:
 * - isbn: string
 * - title: string
 * - author: string
 * - publishedYear: number
 * - pages: number
 * - isAvailable: boolean
 * - genre?: string (optional)
 */

// TODO: Define Book interface here

/**
 * TASK 2: Create Book Objects
 * Create two book objects that match the Book interface:
 * 1. A book that includes the optional genre property
 * 2. A book that doesn't include the optional genre property
 */

// TODO: Create book1 with genre

// TODO: Create book2 without genre

/**
 * TASK 3: Define a Library Member Interface
 * Create an interface called 'LibraryMember' with:
 * - memberId: number
 * - name: string
 * - email: string
 * - membershipDate: Date
 * - booksCheckedOut: number
 */

// TODO: Define LibraryMember interface here

/**
 * TASK 4: Create a Library Member
 * Create a library member object using the interface
 */

// TODO: Create a libraryMember object

/**
 * TASK 5: Define a BookLoan Interface
 * Create an interface called 'BookLoan' with:
 * - book: Book (nested interface)
 * - member: LibraryMember (nested interface)
 * - checkoutDate: Date
 * - dueDate: Date
 * - returnDate?: Date (optional)
 */

// TODO: Define BookLoan interface here

/**
 * TASK 6: Function with Interface Parameter
 * Create a function called 'displayBookInfo' that:
 * - Takes a Book as parameter
 * - Returns a string with formatted book information
 * - Format: "Title by Author (Year) - Pages pages"
 */

// TODO: Implement displayBookInfo function

/**
 * TASK 7: Function with Interface Return Type
 * Create a function called 'createBookLoan' that:
 * - Takes parameters: book (Book), member (LibraryMember), daysUntilDue (number)
 * - Returns a BookLoan object
 * - Sets checkoutDate to current date
 * - Sets dueDate to current date + daysUntilDue
 * - returnDate should be undefined
 */

// TODO: Implement createBookLoan function

/**
 * TASK 8: Array of Interface Objects
 * Create an array called 'library' that contains at least 3 Book objects
 */

// TODO: Create library array

/**
 * TASK 9: Search Function
 * Create a function called 'findBookByTitle' that:
 * - Takes parameters: books (Book[]), searchTitle (string)
 * - Returns Book | undefined
 * - Searches for a book by title (case-insensitive)
 */

// TODO: Implement findBookByTitle function

/**
 * TASK 10: Filter Function
 * Create a function called 'getAvailableBooks' that:
 * - Takes parameter: books (Book[])
 * - Returns Book[]
 * - Returns only books where isAvailable is true
 */

// TODO: Implement getAvailableBooks function

/**
 * BONUS TASK: Readonly Interface
 * Create an interface called 'LibraryConfig' with readonly properties:
 * - maxBooksPerMember: number
 * - loanPeriodDays: number
 * - lateFeePerDay: number
 *
 * Create a config object and try to modify one of its properties
 * (it should show a TypeScript error)
 */

// TODO: Define LibraryConfig interface with readonly properties

// TODO: Create config object

// TODO: Try to modify a readonly property (should error)
// config.maxBooksPerMember = 10;

// Export your interfaces and functions for testing
export {};
