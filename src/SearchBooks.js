import React , { Component } from 'react'
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
class SearchBooks extends Component {
	state = {
    	result:[],
    	booksOnDisplay:[],
    	query:''
  	}
   componentDidMount() {
   	 
  	}
  updateQuery(query) {
  	//console.log("updating query")
    this.setState({ query: query.trim() })
  }

  search(query)
  {
  	this.updateQuery(query)
  	if(query)
  	{
  		BooksAPI.search(query)
  		.then((searchedBooks) => {
  			if(searchedBooks.error==="empty query")
  			{
  				this.setState({result:[]})
  			}
  		searchedBooks=searchedBooks.filter((r)=>r.imageLinks)
  		searchedBooks=searchedBooks.map(b =>{
        b.shelf = this.findShelf(b)
            return b
          })
  		//console.log(result)
  		let result=searchedBooks
  		this.setState({ result })
  		})
  		.catch(err => {
  			console.log(err)
  		}) 
  	}
  	else
  	{
  		//console.log("clearing page")
  		this.setState({
  			result:[],
  			query:''})
  	}
  }

  findShelf = (b) => {
       let bshelf = this.props.books.filter(book => b.id===book.id)
       /*if(bshelf.length)
       		{
       		console.log("Found")
       		console.log(bshelf)
       		}
       	*/
       return bshelf.length ? bshelf[0].shelf : 'none'
  }



	render() {
		const {result,query}=this.state
		return (
				<div className="search-books">
            		<div className="search-books-bar">
              			<Link to="/" className="close-search">Close</Link>
              			<div className="search-books-input-wrapper">
                			 <DebounceInput  minLength={1} placeholder="Search by title or author" onChange={(e) => this.search(e.target.value)}/>
              			</div>
            		</div>
            		<div className="search-books-results">
              			<ol className="books-grid">
              			{result.length>0 ? 
              				(result.map((book) =>
                    		(
                         		<li key={book.id}>
                         		<Book book={book} shelfUpdate={ this.props.shelfUpdate } />
                        		</li>
                      		)
                      		)
                    		)
                    		:(query.length===0) ?(<p>No query entered</p>) : (<p>No results found</p>)
                    	}
						</ol>
            		</div>
          		</div>
				)
			}
}

export default SearchBooks