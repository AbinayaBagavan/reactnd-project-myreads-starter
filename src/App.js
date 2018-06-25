import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

/*app component*/
class BooksApp extends React.Component {
  state = {
    books:[],
  }
  componentDidMount() {
    this.getBooks()
  }

  getBooks =() => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({books})
    })
  }

  shelfUpdate = (book,shelf) =>
  {     
      BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf        
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat(book)
      }))     
})
  }
  render() {
    const currentlyReading=this.state.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead =this.state.books.filter((book) => book.shelf === 'wantToRead')
    const read =this.state.books.filter((book) => book.shelf === 'read')

    return (
      <div className="app">
            <Switch>
            <Route exact path="/" render={() => (

              <ListBooks 
              currentlyReading={ currentlyReading } 
              wantToRead={ wantToRead } 
              read={ read }
              shelfUpdate={ this.shelfUpdate }
            />
              )}/>
            <Route exact path="/search" render={({ history }) => (
              <SearchBooks 
              books={ this.state.books } 
              shelfUpdate={(book,shelf) =>{
                  this.shelfUpdate(book,shelf)
              }}
              />
              )}/>
            </Switch>
      </div>
    )
  }
}

export default BooksApp
