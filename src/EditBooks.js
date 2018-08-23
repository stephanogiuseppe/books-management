import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import api from './Api';

const statuses = {
    'read': 'Read',
    'reading': 'Reading',
    'toRead': 'To read'
};

class EditBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
			genres: [],
            isLoading: false,
            redirect: false,
            book: {}
        }

        this.saveBook = this.saveBook.bind(this);
	}

    componentDidMount() {
		this.setState({ isLoading: true });

        api.getBooksById(this.props.match.params.id).then((resBook) => {
            this.setState({ book: resBook.data });
            this.refs.name.value = this.state.book.name;
            this.refs.status.value = this.state.book.status;
            this.refs.genre.value = this.state.book.genre;
            this.refs.comment.value = this.state.book.comments;
        });

		api.loadGenres().then((resGenres) => {
			this.setState({
				isLoading: false,
                genres: resGenres.data
			});
		});
	}

    saveBook = () => {
        const editBooks = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comment: this.refs.comment.value
        };

        api.updateBook(editBooks).then(() => {
            this.setState({
                redirect: '/books/' + this.refs.genre.value
            });
        });
    }

    render() {
        return (
            <section className="intro-section">
                {
                    this.state.redirect && <Redirect to={ this.state.redirect } />
                }
                <h1>Edit book</h1>

                <form>
                    Name: <input type="text" className="form-control" ref="name" /> <br />

                    Status: 
                        <select ref="status">
                            {
                                Object.keys(statuses).map((status) => {
                                    return (
                                        <option value={ status } key={ status }> { statuses[status] } </option>
                                    );
                                })
                            }
                        </select> <br />

                    Genre:
                        <select ref="genre">
                            {
                                this.state.genres.map((genre) => {
                                    return (
                                        <option value={ genre } key={ genre }> { genre } </option>
                                    );
                                })
                            }
                        </select> <br />

                    Comment: <textarea ref="comment" clas="form-control"></textarea> <br />

                    <input type="button" value="Save" onClick={ this.saveBook } />
                </form>
            </section>
        );
    }
}

export default EditBooks;
