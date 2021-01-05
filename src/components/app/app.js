import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import ErrorMessage from '../errorMessage';
import './app.css';


export default class App extends Component {
    state = {
        showRandomChar: true, 
        error: false //состояние ошибки 
    }
    
    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    onToggleRandomChar = () => {
        this.setState({showRandomChar: !this.state.showRandomChar})
    }

    render() {
        const randGhar = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/> 
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randGhar}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <Button
                                className="btn-toggle"
                                color = "primary"
                                size = ""
                                onClick={this.onToggleRandomChar}>
                                    Toggle random character 
                            </Button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                </Container>
            </>
        );
    }
};
