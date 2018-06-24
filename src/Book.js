import React , { Component } from 'react'

class Book extends Component {

	componentDidMount()
	{
		//console.log("Book Component mounted")
	}
	onShelfUpdate = (e) =>{
		console.log("Inside book update")
		//console.log("the history is"+history)
		let shelf=e.target.value
		this.props.shelfUpdate(this.props.book,shelf)

	}
	render() {
		const {book}=this.props
		return(
			<div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.onShelfUpdate} defaultValue={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )    
			
	}
}

export default Book