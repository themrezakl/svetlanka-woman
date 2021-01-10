import React, {Component} from "react";
import ItemList from "../itemList";
import ItemDetails, {Field} from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class CharacterPage extends Component {
  
  gotService = new GotService();

  state = {
      selectedChar: null, 
      error: false
  }

  onItemSelected = (id) => {
      this.setState({
          selectedChar: id
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

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllCharacters}  //Pattern1 - передача функции через props
        renderItem={({name, gender}) => `${name} (${gender})`}/> //Pattern2 - передача рендер-функции через props
    )

    const charDetails = (
      <ItemDetails 
        itemId={this.state.selectedChar}
        getItem={this.gotService.getCharacter}>
        <Field field='gender' label='Gender' />
        <Field field='born' label='Born' />
        <Field field='died' label='Died' />
        <Field field='culture' label='Culture' />
      </ItemDetails>
    ) 

    return (
      <RowBlock left={itemList} right={charDetails}/>
    )
  }
}