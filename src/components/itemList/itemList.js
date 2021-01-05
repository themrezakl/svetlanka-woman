import React, {Component} from 'react';
import './itemList.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner'
export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then(charList => {
                this.setState({charList})
            })
    }

    renderItem(arr) {
        return arr.map((item) => {
            return (
                <li 
                    key={item.id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(item.id)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {
        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItem(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}