import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './SingleCourse.css';


const SingleCourse = props => {
    return (
        <Col xs={12} sm={6} className='SingleCourse'>
            <Container className='CourseContainer'>
                <Row>
                    <Col xs={12}>{props.title}</Col>
                    <Col xs={12}>{props.content}</Col>
                    <Col xs={12}>{props.price}</Col>
                    <Col xs={12}>{props.level}</Col>
                </Row>
            </Container>
        </Col>
    );
}

export default SingleCourse;