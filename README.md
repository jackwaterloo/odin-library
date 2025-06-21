# The Odin Project: Library
This `js-classes` branch is a refactor of the original `main` branch code using JavaScript Classes. This was a learning exercise in for the classes lesson which can be viewed in the `classes.md` file or at [https://www.theodinproject.com/lessons/node-path-javascript-classes](https://www.theodinproject.com/lessons/node-path-javascript-classes)

## JavaScript Tools and Concepts Demonstrated
**Summary:**  
This project demonstrates proficiency in JavaScript ES6 classes, encapsulation, DOM manipulation, event-driven programming, array/object management, and interactive UI development.

### 1. Object-Oriented Programming with Classes
- **ES6 Classes:** Uses ES6 `class` syntax to define `Book`, `Library`, and `DomBoard` objects, encapsulating data and behaviors.
- **Private Fields and Methods:** Implements private fields and methods (e.g., `#tableHeader`, `#table`) for encapsulation and data hiding.
- **Static Properties:** Utilizes static properties for reusable class-level data (e.g., static table header).
- **Unique Identifiers:** Uses `crypto.randomUUID()` to assign a unique ID to each book for reliable operations.

### 2. Array Management
- **Dynamic Data Storage:** Books are managed in a `books` array within the `Library` class, showcasing array manipulation.
- **Array Methods:** Uses `.push()`, `.findIndex()`, and `.splice()` for adding, finding, and removing books.

### 3. DOM Manipulation
- **Dynamic Table Rendering:** The UI updates in real time by generating table rows based on the current library state.
- **Element Creation & Safe User Data Handling:** Uses `document.createElement()`, `.textContent`, and attribute manipulation to build and update the DOM. User input is always inserted using safe DOM methods (like `.textContent`), never with `.innerHTML`, to prevent XSS vulnerabilities and ensure secure handling of dynamic content.

### 4. Event Handling
- **Event Listeners:** Implements `addEventListener()` for user interactions such as adding, deleting, and toggling books.

### 5. Form Handling and Validation
- **Form Submission:** Uses JavaScript to handle form events and prevent default browser behavior.
- **Input Validation:** Ensures all fields are correctly filled before adding a book.

### 6. Separation of Concerns
- **Data vs. Display:** Separates logic for managing data from UI rendering for maintainable code.