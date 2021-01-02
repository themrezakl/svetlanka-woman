import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import './app.css';


export default class App extends Component {
    state = {
        showRandomChar: true
    }  

    onToggleRandomChar = () => {
        this.setState({showRandomChar: !this.state.showRandomChar})
    }

    render() {
        const randGhar = this.state.showRandomChar ? <RandomChar/> : null;

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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};
