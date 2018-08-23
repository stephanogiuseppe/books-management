import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

import Home from './Home';
import Books from './Books';
import NewBook from './NewBook';
import EditBooks from './EditBooks';

// Stateless Functional Components
const About = () => <section className="intro-section"><h1>About</h1></section>

class App extends Component {

	render() {
		return (
			<Router>
				<div>
					<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
						<div className="container">
							<div className="navbar-header page-scroll">
								<a className="navbar-brand page-scroll" href="#page-top">
									<img src="/images/logo.png" height="30" />
								</a>
							</div>

							<div className="collapse navbar-collapse navbar-ex1-collapse">
								<ul className="nav navbar-nav">
									<li>
										<Link to='/'>Home</Link>
									</li>
									<li>
										<Link to='/new'>New book</Link>
									</li>
									<li>
										<Link to='/about'>About</Link>
									</li>
								</ul>
							</div>
						</div>
					</nav>

					<Route exact path="/" component={ Home } />
					<Route exact path="/books/edit/:id" component={ EditBooks } />
					<Route exact path="/books/:genre" component={ Books } />
					<Route exact path="/new" component={ NewBook } />
					<Route exact path="/about" component={ About } />
				</div>
			</Router>
		);
	}
}

export default App;
