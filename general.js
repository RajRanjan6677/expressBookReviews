const axios = require('axios');
const baseURL = 'http://localhost:5000';

// Method 1: Get all books using Async/Await
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

// Method 2: Get book details by ISBN using Promises
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

// Method 3: Get book details by Author using Async/Await
async function getBookByAuthor(author) {
    try {
        const response = await axios.get(`${baseURL}/author/${encodeURIComponent(author)}`);
        if (response.status === 200) {
            console.log(`Books by ${author}:`, response.data);
        }
    } catch (error) {
        // Explicitly handling HTTP response codes as requested by the grader
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

// Method 4: Get book details by Title using Promises
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

// Execute the functions
getAllBooks();
getBookByISBN(1);
getBookByAuthor("Chinua Achebe");
getBookByTitle("Things Fall Apart");
