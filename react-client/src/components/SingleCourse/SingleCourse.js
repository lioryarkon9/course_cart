import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import './SingleCourse.css';
import {isObjectInList} from '../../utils';


const SingleCourse = props => {
    const isItemInCart = isObjectInList(props.id, props.SelectedCourses);
    return (
        <Col xs={12} sm={6} className='SingleCourse'>
            <Container className='CourseContainer'>
                <Row>
                    <Col xs={12}>{props.title}</Col>
                    <Col xs={12} className='content'>{props.content}</Col>
                    <Col xs={12}>Price: {props.price}$</Col>
                    <Container>
                        <Row className='d-flex justify-content-between'>
                            <Col xs={6}>
                                {props.level}
                            </Col>
                            <Col xs={6} className='text-right'>
                                <Button 
                                    onClick={e => props.removeFromSelected(props.id)}
                                    className='btn-secondary btn-sm remove-course'
                                >
                                    -
                                </Button> 
                                {!isItemInCart ? 
                                    <Button 
                                        onClick={e => props.addToSelected(props.id)}
                                        className='btn-secondary btn-sm add-course'
                                    >
                                        +
                                    </Button>
                                : null}
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </Col>
    );
}

export default SingleCourse;