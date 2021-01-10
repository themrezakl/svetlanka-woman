import React, {Component} from 'react';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class ItemDetails extends Component {

    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) { //всегда нужно делать эту проверку соответствия с предыдущими props
            this.updateItem();
        }   
    }

    updateItem() {
        const {itemId, getItem} = this.props;

        if (!itemId) {
            return;
        }

        getItem(itemId)
            .then(item => {
                this.setState({item})
            })
        // this.foo.bar = 0; //для проверки на ошибку
    }

    render() {
        if (!this.state.item) {
            return <span className='select-error'>Please select a character</span>
        }

        const {item} = this.state;
        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => { //перебирает всех детей компонента на уровне выше
                            return React.cloneElement(child, {item})  // клонирует ребенка, добавляя к его свойствам char
                        })  //
                    } 
                    {/* Pattern3 - {this.props.children} передает все компоненты, 
                    что находятся внутри текущего компонента <CharDetails> уровнем выше */}
                </ul>
            </div>
        );
    }
}