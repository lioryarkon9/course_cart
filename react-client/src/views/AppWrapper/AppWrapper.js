import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './AppWrapper.css';


const AppWrapper = props => {
    return (
        <Container id='AppWrapper'>
            <Row id='Header'>
                <Col>
                    Buy Courses
                </Col>
            </Row>
            {props.children}
        </Container>
    );
}

export default AppWrapper;