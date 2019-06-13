import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SingleCourse from '../../components/SingleCourse';


const CoursesGrid = props => {
    return (
        <Container id='CoursesGrid'>
            <Row>
                {props.AllCourses.map(item => (
                    <SingleCourse
                        key={'_' + item.id}
                        id={item.id}
                        title={item.title}
                        content={item.content}
                        price={item.price}
                        level={item.level}
                    />
                ))}
            </Row>
        </Container>
    );
}

export default CoursesGrid;