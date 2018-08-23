import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/'
});

const apis = {
    loadGenres: () => api.get('genres'),
    saveBook: (newBook) => api.post('books', newBook),
    updateBook: (book) => api.put('books/' + book.id, book),
    getBooksByGenre: (genre) => api.get('books?genre=' + genre),
    deleteBook: (bookId) => api.delete('books/' + bookId),
    getBooksById: (bookId) => api.get('books/' + bookId)
}

export default apis;
