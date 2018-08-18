import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from './Api';

class Home extends Component {

	constructor(props) {
        super(props);

        this.state = {
			genres: [],
			isLoading: false
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

	renderGenreLink(genre) {
		return (
			<Link to={`/books/${ genre }`} key={ genre }> { genre } </Link>
		);
    }

    render() {
        return (
            <div>
                <section id="intro" className="intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1><img src="images/logo.png" style={{ width: 50 + '%' }} /></h1>
                                <p>Never forget the book you read</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    { this.state.isLoading && <span>Loading...</span> }

                    { !this.state.isLoading &&
                        <div>
                            Books genres
                            { this.state.genres.map(g => this.renderGenreLink(g)) }
                            <br />
                            Books genres
                            { this.state.genres.map(this.renderGenreLink) }
                        </div>
                    }
                </section>
            </div>
        );
    }
}

export default Home;
