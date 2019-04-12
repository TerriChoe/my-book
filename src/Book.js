import React from 'react';

class Book extends React.Component {
    state = {
        shelf: this.props.shelf !== undefined ? Object.keys(this.props.shelf)[0] : 'none'
    }

    handleChange = (shelf, book) => {
        this.props.updateShelf(shelf, book);
        this.setState({
            shelf
        })
    }

    renderOptions = (shelf) => {
        let options = [
            {value: 'disabled', label: 'Move to...'},
            {value: 'currentlyReading', label: 'Currently Reading'}, 
            {value: 'wantToRead', label: 'Want to Read'},
            {value: 'read', label: 'Read'},
            {value: 'none', label: 'None'}
        ];
        let optionsRender = [];
        options.forEach((e, index) => {
            // let selected = e.label == shelf ? 'selected' : false;
            // console.log("shelf : " + shelf + ", label: " + e.label);
            // console.log(shelf === e.label);
            optionsRender.push(        
                <option 
                    key={index}
                    value={e.value} 
                    disabled={e.value === 'disabled' ? 'disabled' : false}
                    defaultValue={e.value === this.state.shelf ? true : false}
                >{e.label}</option>
            )
        });
        return optionsRender;
    }
    render() {
        const { imageLinks, title, authors } = this.props.book;
        // let thumbnail = imageLinks.thumbnail;
        let smallThumbnail = imageLinks !== undefined ? imageLinks.smallThumbnail : '';
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, background: `url(${smallThumbnail}) center`, backgroundSize: 'cover' }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={this.state.shelf} onChange={(e) => this.handleChange(e.target.value, this.props.book)}>
                                {this.renderOptions(this.state.shelf)}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
                </div>
            </li>
        );
    }
}

export default Book;