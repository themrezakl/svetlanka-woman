import React, {Component} from "react";
import ItemList from "../itemList";
import ItemDetails, {Field} from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class HousesPage extends Component {
  
  gotService = new GotService();

  state = {
      selectedHouse: null, 
      error: false
  }

  onItemSelected = (id) => {
      this.setState({
          selectedHouse: id
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

    const houseList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllHouses}  //Pattern1 - передача функции через props
        renderItem={({name, region}) => `${name} (${region})`}/> //Pattern2 - передача рендер-функции через props
    )

    const houseDetails = (
      <ItemDetails 
        itemId={this.state.selectedHouse}
        getItem={this.gotService.getHouse}>
        <Field field='region' label='region' />
        <Field field='words' label='words' />
        <Field field='titles' label='titles' />
        <Field field='overlord' label='overlord' /> 
        <Field field='ancestralWeapons' label='ancestralWeapons' />
      </ItemDetails>
    ) 

    return (
      <RowBlock left={houseList} right={houseDetails}/>
    )
  }
}