import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner'
export default class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;  //Pattern1 - передача функции через props

        getData()
            .then(itemList => {
                this.setState({itemList})
            })
    }

    renderItem(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);  //Pattern2 - передача рендер-функции через props

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItem(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}