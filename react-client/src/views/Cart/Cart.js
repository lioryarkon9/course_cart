import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './Cart.css';


const CartView = props => {
    const NumItems = props.SelectedCourses.length;
    return (
        <Container id='Cart'>
            <Row id='CartTitle'>
                <Col>
                    Your Cart
                </Col>
            </Row>
            <Row>
                <Container id='CartBody'>
                    {NumItems ? props.SelectedCourses.map(item => (
                        <Row>
                            <Col xs={9} sm={8}>title</Col>
                            <Col xs={3} sm={4}>price</Col>
                        </Row>
                    )) : 'No items yet'}
                    <Row>
                        <Col xs={10}>
                            Sum
                        </Col>
                        <Col xs={2}>
                            0
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    );
}

CartView.defaultProps = {
    SelectedCourses: [1,2,3]
}

export default CartView;