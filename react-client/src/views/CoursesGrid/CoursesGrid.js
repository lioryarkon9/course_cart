import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SingleCourse from '../../components/SingleCourse';
import {LEVEL, PRICE} from '../../consts';


const CoursesGrid = props => {
    const AllCourses = props.AllCourses;
    const SearchOptions = props.searchOptions;
    const SearchValue = props.searchValue;
    const RelevantCourseItems = SearchValue ? SearchOptions : AllCourses;
    return (
        <Container id='CoursesGrid'>
            <Row>
                <Col>
                    <div className='form-group'>
                        <input 
                            placeholder='Search Courses...'
                            className='form-control'
                            onChange={props.onChangeSearchInput}
                            value={props.searchValue}
                        />
                    </div>
                    <div className="form-text text-muted">
                        {!RelevantCourseItems.length ? 'No matches' : null}
                    </div>
                </Col>
                <Col>
                    <div className='form-group'>
                        <select 
                            onChange={e => props.sortCoursesByParam(e.currentTarget.value)}
                            className="form-control" id="sort-by"
                        >
                            <option value="">sort by</option>
                            <option value={LEVEL}>level</option>
                            <option value={PRICE}>price</option>
                        </select>
                    </div>
                </Col>
            </Row>
            <Row>
                {RelevantCourseItems.map(item => (
                    <SingleCourse
                        key={'_' + item.id}
                        id={item.id}
                        title={item.title}
                        content={item.content}
                        price={item.price}
                        level={item.level}
                        addToSelected={props.addToSelected}
                        removeFromSelected={props.removeFromSelected}
                        SelectedCourses={props.SelectedCourses}
                    />
                ))}
            </Row>
        </Container>
    );
}

export default CoursesGrid;