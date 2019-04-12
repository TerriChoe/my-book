import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const shelfTypes = [
    {'currentlyReading': 'Currently Reading'},
    {'wantToRead': 'Want to Read'},
    {'read': 'Read'}
]
class BookList extends Component {
    renderBookShelves = (books) => {
        return shelfTypes.map((shelf, index) => <BookShelf key={index} shelf={shelf} books={books[index]} updateShelf={this.props.updateShelf} />)
    };

    render() {
        const { readingBooks, wantToBooks, finishedBooks } = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                    {this.renderBookShelves([readingBooks, wantToBooks, finishedBooks])}
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default BookList;