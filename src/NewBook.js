import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import api from './Api';

const statuses = {
    'read': 'Read',
    'reading': 'Reading',
    'toRead': 'To read'
};

class NewBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
			genres: [],
            isLoading: false,
            redirect: false
		}
	}

    componentDidMount() {
		this.setState({ isLoading: true });

		api.loadGenres().then((resGenres) => {
			this.setState({
				isLoading: false,
                genres: resGenres.data
			});
		});
	}

    saveBook = () => {
        const newBook = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comment: this.refs.comment.value
        };
        api.saveBook(newBook).then((resSaveBook) => {
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
                <h1>New book</h1>

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

export default NewBook;
