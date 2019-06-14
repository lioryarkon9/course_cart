import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './AppWrapper.css';


const AppWrapper = props => {
    return (
        <Container id='AppWrapper'>
            <Row id='Header' className='d-flex justify-content-between'>
                <Col>
                    Buy Courses
                </Col>
                <Col className='d-flex justify-content-end'>
                    <div id='num-items'>{props.numItemsInCart}</div>
                </Col>
            </Row>
            {props.children}
        </Container>
    );
}

export default AppWrapper;