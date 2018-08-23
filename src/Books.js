import React, { Component } from 'react';

import api from './Api';

const statuses = {
    'read': 'Read',
    'reading': 'Reading',
    'toRead': 'To read'
};

class Books extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            isLoding: false,
            books: []
        }

        this.renderBooks = this.renderBooks.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }
    
    loadData = () => {
        this.setState({ isLoding: true });
        api.getBooksByGenre(this.props.match.params.genre).then((resBooks) => {
            this.setState({
                isLoding: false,
                books: resBooks.data
            });
        });
    }
    
    deleteBook = (id) => {
        api.deleteBook(id).then(() => {
            this.loadData();
        });
    }

    renderBooks = (book) => {
        return (
            <div className="item  col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">{ book.name }</h4>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead">{ book.genre } - { statuses[book.status] }</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <a className="btn btn-success">Edit</a>
                            <a className="btn btn-success" onClick={() => this.deleteBook(book.id)}>Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <section id="intro" className="intro-section">
                <h1>Books of { this.props.match.params.genre }</h1>
                {
                    this.state.isLoding && 
                    <p>Loading...</p>
                }
                {
                    !this.state.isLoding && this.state.books.length === 0 &&
                    <div className='alert alert-info'>No book registered</div>
                }

                <div id="books" className="row list-group">
                    {
                        !this.state.isLoding && 
                        this.state.books.map(this.renderBooks)
                    }
                </div>
            </section>
        );
    }

}

export default Books;
