import React, { Component } from 'react';

import api from './Api';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			genres: [],
			isLoading: false
		}
	}

	componentDidMount() {

		// this.state.isLoading = true;

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
			<a href=""> { genre } </a>
		);
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
					<div className="container">
						<div className="navbar-header page-scroll">
							<a className="navbar-brand page-scroll" href="#page-top">
								<img src="images/logo.png" height="30" />
							</a>
						</div>

						<div className="collapse navbar-collapse navbar-ex1-collapse">
							<ul className="nav navbar-nav">
								<li>
									<a href="">Menu item</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>


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

export default App;
