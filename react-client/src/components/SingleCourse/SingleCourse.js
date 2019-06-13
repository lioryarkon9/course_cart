import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';


const SingleCourse = props => {
    return (
        <Container className='SingleCourse'>
            <Row>
                <Col>{props.title}</Col>
                <Col>{props.content}</Col>
                <Col>{props.price}</Col>
                <Col>{props.level}</Col>
            </Row>
        </Container>
    );
}

export default SingleCourse;