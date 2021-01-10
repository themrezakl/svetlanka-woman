import React, {Component} from "react";
import ItemList from "../itemList";
import ItemDetails, {Field} from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class BooksPage extends Component {
  
  gotService = new GotService();

  state = {
      selectedBook: null, 
      error: false
  }

  onItemSelected = (id) => {
      this.setState({
          selectedBook: id
      })
  } 

  componentDidCatch() {
    this.setState({
        error: true
    })
}

  render () {
    if (this.state.error) {
      return <ErrorMessage/> 
    }

    const bookList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}  //Pattern1 - передача функции через props
        renderItem={({name, numberOfPages}) => `${name} (${numberOfPages} pages)`}/> //Pattern2 - передача рендер-функции через props
    )

    const bookDetails = (
      <ItemDetails 
        itemId={this.state.selectedBook}
        getItem={this.gotService.getBook}>
        <Field field='numberOfPages' label='NumberOfPages' />
        <Field field='publisher' label='Publisher' />
        <Field field='released' label='Released' />
      </ItemDetails>
    ) 

    return (
      <RowBlock left={bookList} right={bookDetails}/>
    )
  }
}