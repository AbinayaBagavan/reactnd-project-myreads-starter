import React from 'react'
import { Route } from 'react-router-dom'
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
    //console.log("Component mounted")
    this.getBooks()
  }

  getBooks =() => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({books:books})
      //console.log(this.state.books)
    })
  }

  shelfUpdate = (book,shelf) =>
  {     
      BooksAPI.update(book,shelf)
      .then(()=>{
        this.getBooks()
      })
  }
  render() {
    const currentlyReading=this.state.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead =this.state.books.filter((book) => book.shelf === 'wantToRead')
    const read =this.state.books.filter((book) => book.shelf === 'read')
    //console.log("During render")
    //console.log(this.state.books)
    return (
      <div className="app">
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
                  //history.push('/')
                  //this.forceUpdate()  
              }}
              />
              )}/>
      </div>
    )
  }
}

export default BooksApp
