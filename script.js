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
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read ? "Yes" : "No"}</td>
      <td>${book.id}</td>
      <td>
        <button class="deleteBtn" data-id="${book.id}">Delete</button>
        <button class="readBtn" data-id="${book.id}">${book.read ? "Unread" : "Read"}</button>
      </td>
    `;
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


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
displayBooks();