import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import Search from './Search';
import './App.css'

class App extends Component {
    state = {
        readingBooks: [],
        wantToBooks: [],
        finishedBooks: []
    };

    componentDidMount = async () => {
        console.log("componentDidMount");
        let books = await BooksAPI.getAll();
        let readingBooks = books.filter(book => book.shelf === "currentlyReading");
        let wantToBooks = books.filter(book => book.shelf === "wantToRead");
        let finishedBooks = books.filter(book => book.shelf === "read");

        this.setState({ 
            readingBooks,
            wantToBooks,
            finishedBooks,
        });
    };

    updateShelf = (shelf, book) => {
        BooksAPI.update(book, shelf);
        let previousShelf = book.shelf;
        if (shelf === 'none') {
            delete book.shelf;
        } else {
            book.shelf = shelf;
        }
        switch(shelf) {
            case 'currentlyReading' :
                switch(previousShelf) {
                    case 'currentlyReading' :
                    break;
                    case 'wantToRead' :
                    this.setState({
                        wantToBooks: this.state.wantToBooks.filter(e => e.id !== book.id),
                        readingBooks: this.state.readingBooks.concat([book])
                    })
                    break;
                    case 'read' :
                    this.setState({
                        finishedBooks: this.state.finishedBooks.filter(e => e.id !== book.id),
                        readingBooks: this.state.readingBooks.concat([book])
                    })
                    break;
                    default:
                    this.setState({
                        readingBooks: this.state.readingBooks.concat([book])
                    })
                }
                break;
            case 'wantToRead' : 
                switch(previousShelf) {
                    case 'currentlyReading' :
                    this.setState({
                        readingBooks: this.state.readingBooks.filter(e => e.id !== book.id),
                        wantToBooks: this.state.wantToBooks.concat([book])
                    })
                    break;
                    case 'wantToRead' :
                    break;
                    case 'read' :
                    this.setState({
                        finishedBooks: this.state.finishedBooks.filter(e => e.id !== book.id),
                        wantToBooks: this.state.wantToBooks.concat([book])
                    })
                    break;
                    default:
                    this.setState({
                        wantToBooks: this.state.wantToBooks.concat([book])
                    })
                }
                break;
            case 'read' : 
                switch(previousShelf) {
                    case 'currentlyReading' :
                    this.setState({
                        readingBooks: this.state.readingBooks.filter(e => e.id !== book.id),
                        finishedBooks: this.state.finishedBooks.concat([book])
                    })
                    break;
                    case 'wantToRead' :
                    this.setState({
                        wantToBooks: this.state.wantToBooks.filter(e => e.id !== book.id),
                        finishedBooks: this.state.finishedBooks.concat([book])
                    })
                    break;
                    case 'read' :
                    break;
                    default:
                    this.setState({
                        finishedBooks: this.state.finishedBooks.concat([book])
                    })
                }
                break;
            default:
                switch(previousShelf) {
                    case 'currentlyReading' :
                    this.setState({
                        readingBooks: this.state.readingBooks.filter(e => e.id !== book.id),
                    })
                    break;
                    case 'wantToRead' :
                    this.setState({
                        wantToBooks: this.state.wantToBooks.filter(e => e.id !== book.id),
                    })
                    break;
                    case 'read' :
                    this.setState({
                        finishedBooks: this.state.finishedBooks.filter(e => e.id !== book.id),
                    })
                    break;
                    default:
                }
            break;
        }
    }
    render() {
        const { readingBooks, wantToBooks, finishedBooks, nonedBooks } = this.state;
        return (
            <div className="app">
                <Switch>
                    <Route path="/search" render={() => 
                        <Search 
                            updateShelf={this.updateShelf}
                        />
                    } />
                    <Route exact path="/" render={() => (
                        <BookList 
                            readingBooks={readingBooks}
                            wantToBooks={wantToBooks}
                            finishedBooks={finishedBooks}
                            nonedBooks={nonedBooks}
                            updateShelf={this.updateShelf}
                        />
                    )} />
                </Switch>
            </div>
        )
    }
}

export default App;