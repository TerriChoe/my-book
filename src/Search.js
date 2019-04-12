import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
    static propType = {
        books: PropTypes.array.isRequired
    }
    state = {
        search: '',
        books: []
    }

    updateBooks = async (query) => {
        if(query) {
            let books = await BooksAPI.search(query);
            console.log("search :", books)
            if (books.error) {
                return;
            }
            this.setState({
                books
            })
        }
    }

    updateShelf = async (shelf, book) => {
        await this.props.updateShelf(shelf, book);
        this.setState({
            books: this.state.books.filter(e => e.id !== book.id)
        })
    }

    handleSearchChange = (e) => {
        this.updateBooks(e.target.value);
        this.setState({
            search: e.target.value
        })
    }

    renderBooks = (books) => {
        return books.map(book => <Book key={book.id} book={book} updateShelf={this.updateShelf}/>)
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" value={this.state.search} placeholder="Search by title or author" onChange={this.handleSearchChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.renderBooks(this.state.books)}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;