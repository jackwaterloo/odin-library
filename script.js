const myLibrary = [];
const tableHeader = document.createElement("tr");
tableHeader.innerHTML = `
                <th>Title</th>
                <th>Author</th>
                <th>Pages</th>
                <th>Read</th>
                <th>ID</th>
                <th>Buttons</th>`;

/**
 * Represents a book in the library.
 * @class
 * @property {string} title - The title of the book.
 * @property {string} author - The author of the book.
 * @property {number} pages - The number of pages in the book.
 * @property {boolean} read - Whether the book has been read.
 * @property {string} id - A unique identifier for the book.
 */
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }
}

// library class
/**
 * Represents a library that holds a collection of books.
 * @class
 */
class Library {
  constructor(){
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }
}

// display class
/**
 * Class representing the DOM interface for displaying and managing a library of books.
 * Handles rendering a table of books, including headers, and provides functionality
 * for deleting books and toggling their read status via dynamically generated buttons.
 *
 * @class
 * @example
 * const board = new DomBoard();
 * board.displayBooks();
 */
class DomBoard {
  // create static table header
  static #tableHeader = (() => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
                <th>Title</th>
                <th>Author</th>
                <th>Pages</th>
                <th>Read</th>
                <th>ID</th>
                <th>Buttons</th>`;

    return tr;
  })();

  #table = document.querySelector("table");

  constructor () {
    this.library = new Library();
  }

  displayBooks() {
    // Clear the table before displaying new data
    this.#table.innerHTML = "";
    this.#table.appendChild(DomBoard.#tableHeader); // Set the table header
    
    for (const book of this.library.books) {
      const newRow = this.#createTableRow(book);
      this.#table.appendChild(newRow);
    }

    // add listeners to delete and read buttons
    this.#addListenersToDeleteButtons();
    this.#addListenersToReadButtons();
  }

  #createTableRow(book) {
    const newRow = document.createElement("tr");

    // Create td elements for each property of the book
    for (const key in book) {
      const td = document.createElement("td");
      td.textContent = book[key];
      if (key === "read") {
        td.textContent = book[key] ? "Yes" : "No";
      }
      newRow.appendChild(td);
    }

    // Create a td for the Buttons
    const btnTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.setAttribute("data-id", book.id); // bookID is not user input
    const readBtn = document.createElement("button");
    readBtn.textContent = book.read ? "Unread" : "Read";
    readBtn.classList.add("readBtn");
    readBtn.setAttribute("data-id", book.id); // bookID not user input

    // Adds buttons into the td
    btnTd.appendChild(deleteBtn);
    btnTd.appendChild(readBtn);
    // Adds the Btn td to the new row
    newRow.appendChild(btnTd);

    return newRow;
  }

  // Add event listener for delete btns
  #addListenersToDeleteButtons() {
    for (const deleteBtn of document.querySelectorAll(".deleteBtn")) {
      deleteBtn.addEventListener("click", (e) => {
        const bookId = e.target.getAttribute("data-id");
        const bookIndex = this.library.books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
          this.library.books.splice(bookIndex, 1); // Remove the book from the library
          this.displayBooks(); // Refresh the display
        }
      });
    }
  }

  // Add event listeners for read/unread btns
  #addListenersToReadButtons() {
    for (const readBtn of document.querySelectorAll(".readBtn")) {
      readBtn.addEventListener("click", (e) => {
        const bookId = e.target.getAttribute("data-id");
        const book = this.library.books.find(book => book.id === bookId);
        if (book) {
          book.read = !book.read; // Toggle the read status
          this.displayBooks(); // Refresh the display
        }
      });
    }
  }


}

const board = new DomBoard();

// add event listener to the New Book button
document.querySelector("#newBookBtn").addEventListener("click", (e) => {
  const newBookForm = document.querySelector("#newBookFormDiv");
  newBookForm.classList.toggle("hidden");
});

// add event listener to the form submit button and handle form submission
document.querySelector("#submitBookBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const pages = parseInt(document.querySelector("#pages").value.trim(), 10);
  const read = document.querySelector("#read").checked;

  // Validate input fields
  if (title && author && pages > 0) {
    const book = new Book(title,author,pages,read);
    board.library.addBook(book);
    board.displayBooks(); // Display the updated library
    document.querySelector("form").reset(); // Reset the form
    document.querySelector("#newBookFormDiv").classList.add("hidden"); // Hide the form
  } else {
    alert("Please fill in all fields correctly.");
  }
});


// Example usage
const exampleBook = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
board.library.addBook(exampleBook);
board.displayBooks();