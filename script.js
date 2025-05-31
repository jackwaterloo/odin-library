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
 * Represents a book with its details.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @param {number} pages - The number of pages in the book.
 * @param {boolean} read - Whether the book has been read.
 * @method info - Logs information about the book to the console.
 */
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();

  this.info = function() {
    let readText = "has been read";
    if (!this.read) {
      readText = "not read yet";
    }
    // Log book information to the console
    console.log(`${this.title} by ${this.author}, ${pages} pages, ${readText}`);
  }
}

/**
 * Adds a new book to the library.
 *
 * Creates a Book instance with the provided details and stores it in the myLibrary array.
 *
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @param {number} pages - The number of pages in the book.
 * @param {boolean} read - Whether the book has been read.
 */
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

/**
 * Displays all books from the `myLibrary` array in an HTML table.
 */
function displayBooks() {
  const table = document.querySelector("table");
  // Clear the table before displaying new data
  table.innerHTML = "";
  table.appendChild(tableHeader); // Set the table header
  
  for (const book of myLibrary) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read ? "Yes" : "No"}</td>
      <td>${book.id}</td>
    `;
    table.appendChild(newRow);
  }
}
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
displayBooks();