import React, {Component} from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';

const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}

export {Field};

export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        char: null
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) { //всегда нужно делать эту проверку соответствия с предыдущими props
            this.updateChar();
        }   
    }

    updateChar() {
        const {charId} = this.props;

        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })
        // this.foo.bar = 0; //для проверки на ошибку
    }

    render() {
        if (!this.state.char) {
            return <span className='select-error'>Please select a character</span>
        }

        const {char} = this.state;
        const {name} = char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => { //перебирает всех детей компонента на уровне выше
                            return React.cloneElement(child, {char})  // клонирует ребенка, добавляя к его свойствам char
                        })  //
                    } 
                    {/* Pattern3 - {this.props.children} передает все компоненты, 
                    что находятся внутри текущего компонента <CharDetails> уровнем выше */}
                </ul>
            </div>
        );
    }
}