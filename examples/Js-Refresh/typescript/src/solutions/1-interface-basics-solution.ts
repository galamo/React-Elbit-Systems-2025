// Solution: Interface Basics Exercise

/**
 * TASK 1: Define a Book Interface
 */
interface Book {
  isbn: string;
  title: string;
  author: string;
  publishedYear: number;
  pages: number;
  isAvailable: boolean;
  genre?: string; // Optional
}

/**
 * TASK 2: Create Book Objects
 */
const book1: Book = {
  isbn: "978-0-7475-3269-9",
  title: "Harry Potter and the Philosopher's Stone",
  author: "J.K. Rowling",
  publishedYear: 1997,
  pages: 223,
  isAvailable: true,
  genre: "Fantasy", // Includes optional genre
};

const book2: Book = {
  isbn: "978-0-06-112008-4",
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  publishedYear: 1960,
  pages: 324,
  isAvailable: false,
  // No genre property
};

/**
 * TASK 3: Define a Library Member Interface
 */
interface LibraryMember {
  memberId: number;
  name: string;
  email: string;
  membershipDate: Date;
  booksCheckedOut: number;
}

/**
 * TASK 4: Create a Library Member
 */
const libraryMember: LibraryMember = {
  memberId: 1001,
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  membershipDate: new Date("2023-01-15"),
  booksCheckedOut: 2,
};

/**
 * TASK 5: Define a BookLoan Interface
 */
interface BookLoan {
  book: Book;
  member: LibraryMember;
  checkoutDate: Date;
  dueDate: Date;
  returnDate?: Date; // Optional
}

/**
 * TASK 6: Function with Interface Parameter
 */
function displayBookInfo(book: Book): string {
  return `${book.title} by ${book.author} (${book.publishedYear}) - ${book.pages} pages`;
}

/**
 * TASK 7: Function with Interface Return Type
 */
function createBookLoan(
  book: Book,
  member: LibraryMember,
  daysUntilDue: number
): BookLoan {
  const checkoutDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + daysUntilDue);

  return {
    book,
    member,
    checkoutDate,
    dueDate,
    // returnDate is undefined (not included)
  };
}

/**
 * TASK 8: Array of Interface Objects
 */
const library: Book[] = [
  {
    isbn: "978-0-7475-3269-9",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    publishedYear: 1997,
    pages: 223,
    isAvailable: true,
    genre: "Fantasy",
  },
  {
    isbn: "978-0-06-112008-4",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: 1960,
    pages: 324,
    isAvailable: false,
    genre: "Fiction",
  },
  {
    isbn: "978-0-452-28423-4",
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949,
    pages: 328,
    isAvailable: true,
    genre: "Dystopian",
  },
  {
    isbn: "978-0-7432-7356-5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: 1925,
    pages: 180,
    isAvailable: true,
    genre: "Classic",
  },
];

/**
 * TASK 9: Search Function
 */
function findBookByTitle(books: Book[], searchTitle: string): Book | undefined {
  return books.find(
    (book) => book.title.toLowerCase() === searchTitle.toLowerCase()
  );
}

/**
 * TASK 10: Filter Function
 */
function getAvailableBooks(books: Book[]): Book[] {
  return books.filter((book) => book.isAvailable);
}

/**
 * BONUS TASK: Readonly Interface
 */
interface LibraryConfig {
  readonly maxBooksPerMember: number;
  readonly loanPeriodDays: number;
  readonly lateFeePerDay: number;
}

const config: LibraryConfig = {
  maxBooksPerMember: 5,
  loanPeriodDays: 14,
  lateFeePerDay: 0.5,
};

// Uncommenting the line below will cause a TypeScript error:
// config.maxBooksPerMember = 10; // Error: Cannot assign to 'maxBooksPerMember' because it is a read-only property

// ============================================
// DEMONSTRATION / TESTING
// ============================================

console.log("📚 Library Management System - Solution\n");

// Test displayBookInfo
console.log("Book Info:");
console.log(displayBookInfo(book1));
console.log(displayBookInfo(book2));
console.log();

// Test createBookLoan
console.log("Creating Book Loan:");
const loan = createBookLoan(book1, libraryMember, 14);
console.log(`${loan.member.name} checked out "${loan.book.title}"`);
console.log(`Due date: ${loan.dueDate.toDateString()}`);
console.log();

// Test library array
console.log("Library Collection:");
library.forEach((book, index) => {
  console.log(
    `${index + 1}. ${book.title} - ${
      book.isAvailable ? "Available" : "Checked Out"
    }`
  );
});
console.log();

// Test findBookByTitle
console.log("Search Results:");
const foundBook = findBookByTitle(library, "1984");
if (foundBook) {
  console.log(`Found: ${displayBookInfo(foundBook)}`);
} else {
  console.log("Book not found");
}
console.log();

// Test getAvailableBooks
console.log("Available Books:");
const availableBooks = getAvailableBooks(library);
availableBooks.forEach((book) => {
  console.log(`- ${book.title}`);
});
console.log();

// Display config
console.log("Library Configuration:");
console.log(`Max books per member: ${config.maxBooksPerMember}`);
console.log(`Loan period: ${config.loanPeriodDays} days`);
console.log(`Late fee: $${config.lateFeePerDay} per day`);

export {
  Book,
  LibraryMember,
  BookLoan,
  LibraryConfig,
  displayBookInfo,
  createBookLoan,
  findBookByTitle,
  getAvailableBooks,
  library,
};
