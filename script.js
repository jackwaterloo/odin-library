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
    const newRow = createTableRow(book);
    table.appendChild(newRow);
  }
  // Add event listeners to btns in table after it is rendered
  addListenersToDeleteButtons();
  addListenersToReadButtons();
}

// add event listener to the New Book button
document.querySelector("#newBookBtn").addEventListener("click", (e) => {
  const newBookForm = document.querySelector("#newBookFormDiv");
  newBookForm.classList.toggle("hidden");
});

// This function creates a table row for a book object and returns it. Uses textContent to set the text of each td element.
function createTableRow(book) {
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

// add event listener to the form submit button and handle form submission
document.querySelector("#submitBookBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const pages = parseInt(document.querySelector("#pages").value.trim(), 10);
  const read = document.querySelector("#read").checked;

  // Validate input fields
  if (title && author && pages > 0) {
    addBookToLibrary(title, author, pages, read);
    displayBooks(); // Display the updated library
    document.querySelector("form").reset(); // Reset the form
    document.querySelector("#newBookFormDiv").classList.add("hidden"); // Hide the form
  } else {
    alert("Please fill in all fields correctly.");
  }
});

// Add event listener for delete btns
function addListenersToDeleteButtons() {
  for (const deleteBtn of document.querySelectorAll(".deleteBtn")) {
    deleteBtn.addEventListener("click", (e) => {
      const bookId = e.target.getAttribute("data-id");
      const bookIndex = myLibrary.findIndex(book => book.id === bookId);
      console.log(`Deleting book with ID: ${bookId}`);
      if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1); // Remove the book from the library
        displayBooks(); // Refresh the display
      }
    });
  }
}

// Add event listeners for read/unread btns
function addListenersToReadButtons() {
  for (const readBtn of document.querySelectorAll(".readBtn")) {
    readBtn.addEventListener("click", (e) => {
      const bookId = e.target.getAttribute("data-id");
      const book = myLibrary.find(book => book.id === bookId);
      if (book) {
        book.read = !book.read; // Toggle the read status
        displayBooks(); // Refresh the display
      }
    });
  }
}

// Example usage
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
displayBooks();