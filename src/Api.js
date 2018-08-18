import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/'
});

const apis = {
    loadGenres: () => api.get('genres'),
    saveBook: (newBook) => api.post('books', newBook),
    getBooksByGenre: (genre) => api.get('books?genre=' + genre)
}

export default apis;
