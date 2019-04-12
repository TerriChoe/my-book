import React from 'react';
import Book from './Book';

const renderBooks = (shelf, books, updateShelf) => {
    return books.map(book => <Book key={book.id} updateShelf={updateShelf} shelf={shelf} book={book}/>)
}

const BookShelf = ({shelf, books, updateShelf}) => {
    let name = Object.values(shelf)[0];
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {renderBooks(shelf, books, updateShelf)}
                </ol>
            </div>
        </div>
    );
};

export default BookShelf;