import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './Cart.css';


const CartView = props => {
    const NumItems = props.SelectedCourses.length;
    const SumPrices = props.SelectedCourses.reduce((sum, item) => {
        sum += item.price;
        return sum;
    }, 0);
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
                        <Row key={'_cart-item' + item.id} className='cart-item'>
                            <Col xs={9} sm={8}>{item.title}</Col>
                            <Col className='text-right' xs={3} sm={4}>{item.price}$</Col>
                        </Row>
                    )) : 'No items yet'}
                    <Row>
                        <Col xs={10} sm={9}>
                            Sum
                        </Col>
                        <Col xs={2} sm={2}>
                            {SumPrices ? SumPrices : 0}$
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