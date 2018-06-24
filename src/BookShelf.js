import React , { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
	static propTypes= {
		bookList:PropTypes.array.isRequired,
		shelfName:PropTypes.string
	}
	render() {
		const {bookList,shelfName,shelfUpdate}=this.props
		return (
			<div className="bookshelf">
                  	<h2 className="bookshelf-title">{shelfName}</h2>
                  	<div className="bookshelf-books">
                    	<ol className="books-grid">
                    		{bookList.map((book) =>
                    			(
                         			<li key={book.id}>
                         				<Book book={book} shelfUpdate={ shelfUpdate }/>
                        			</li>
                      			)
                    			)}
                      				
                    	</ol>
                  	</div>
                </div>
		)
	}
}


export default BookShelf 