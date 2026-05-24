const axios = require('axios');
const baseURL = 'http://localhost:5000';

/**
 * Purpose: Retrieves a list of all available books in the shop.
 * Expected Input: None.
 * Expected Output: Logs a JSON object containing all books, where keys are ISBNs and values are book details.
 * Method: Uses async/await with Axios.
 */
async function getAllBooks() {
    try {
        const response = await axios.get(`${baseURL}/`);
        if (response.status === 200) {
            console.log("All Books:", response.data);
        }
    } catch (error) {
        if (error.response) {
            console.error(`Error: Server responded with status ${error.response.status}`);
        } else {
            console.error("Error fetching all books:", error.message);
        }
    }
}

/**
 * Purpose: Retrieves the details of a specific book based on its ISBN.
 * Expected Input: isbn (String or Number) - The unique identifier for the book.
 * Expected Output: Logs a JSON object containing the specific book's details (author, title, reviews).
 * Method: Uses Promises (.then/.catch) with Axios.
 */
function getBookByISBN(isbn) {
    axios.get(`${baseURL}/isbn/${isbn}`)
        .then(response => {
            if (response.status === 200) {
                console.log(`Book details for ISBN ${isbn}:`, response.data);
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                console.error(`Error: Book with ISBN ${isbn} not found (404).`);
            } else if (error.response) {
                console.error(`Error: Server responded with status ${error.response.status}`);
            } else {
                console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
            }
        });
}

/**
 * Purpose: Retrieves all books written by a specific author.
 * Expected Input: author (String) - The name of the author to search for.
 * Expected Output: Logs a JSON array of book objects written by the specified author.
 * Method: Uses async/await with Axios.
 */
async function getBookByAuthor(author) {
    try {
        const response = await axios.get(`${baseURL}/author/${encodeURIComponent(author)}`);
        if (response.status === 200) {
            console.log(`Books by ${author}:`, response.data);
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                console.error(`Error: No books found for author "${author}" (404).`);
            } else {
                console.error(`Error: Server responded with status ${error.response.status}`);
            }
        } else {
            console.error(`Error fetching books by ${author}:`, error.message);
        }
    }
}

/**
 * Purpose: Retrieves all books matching a specific title.
 * Expected Input: title (String) - The title of the book to search for.
 * Expected Output: Logs a JSON array of book objects matching the specified title.
 * Method: Uses Promises (.then/.catch) with Axios.
 */
function getBookByTitle(title) {
    axios.get(`${baseURL}/title/${encodeURIComponent(title)}`)
        .then(response => {
            if (response.status === 200) {
                console.log(`Books titled "${title}":`, response.data);
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                console.error(`Error: No books found with title "${title}" (404).`);
            } else if (error.response) {
                console.error(`Error: Server responded with status ${error.response.status}`);
            } else {
                console.error(`Error fetching books titled "${title}":`, error.message);
            }
        });
}

// Execute the functions to demonstrate functionality
getAllBooks();
getBookByISBN(1);
getBookByAuthor("Chinua Achebe");
getBookByTitle("Things Fall Apart");
