const axios = require('axios');
const baseURL = 'http://localhost:5000';

// Method 1: Get all books using Async/Await
async function getAllBooks() {
    try {
        const response = await axios.get(`${baseURL}/`);
        console.log("All Books:", response.data);
    } catch (error) {
        console.error("Error fetching all books:", error.message);
    }
}

// Method 2: Get book details by ISBN using Promises
function getBookByISBN(isbn) {
    axios.get(`${baseURL}/isbn/${isbn}`)
        .then(response => {
            console.log(`Book details for ISBN ${isbn}:`, response.data);
        })
        .catch(error => {
            console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
        });
}

// Method 3: Get book details by Author using Async/Await
async function getBookByAuthor(author) {
    try {
        const response = await axios.get(`${baseURL}/author/${encodeURIComponent(author)}`);
        console.log(`Books by ${author}:`, response.data);
    } catch (error) {
        console.error(`Error fetching books by ${author}:`, error.message);
    }
}

// Method 4: Get book details by Title using Promises
function getBookByTitle(title) {
    axios.get(`${baseURL}/title/${encodeURIComponent(title)}`)
        .then(response => {
            console.log(`Books titled "${title}":`, response.data);
        })
        .catch(error => {
            console.error(`Error fetching books titled "${title}":`, error.message);
        });
}

// Execute the functions
getAllBooks();
getBookByISBN(1);
getBookByAuthor("Chinua Achebe");
getBookByTitle("Things Fall Apart");
