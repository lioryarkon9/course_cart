import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import {handleFetchErrors, writeCoursesErrToConsole} from './utils';
import MOCK_DATA from './assets/mock_data/courses.json';
import AppWrapper from './views/AppWrapper';
import CoursesGrid from './views/CoursesGrid';
import CartView from './views/Cart';
import './App.css';


class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            AllCourses: [],
            SelectedCourses: []
        }
    }
    componentDidMount () {
        this.setCourses();
    }
    async setCourses () {
        const Courses = await this.getCoursees();
        this.setState({AllCourses: Courses});
    }
    getCoursees () {
        return fetch('/get_courses')
        .then(handleFetchErrors)
        .then(httpRes => httpRes.json())
        .catch(err => {
            writeCoursesErrToConsole(err);
            return MOCK_DATA;
        })
    }
    render () {
        console.info(this.state);
        return (
            <AppWrapper>
                <Row id='App'>
                    <Col 
                        sm={{span: 9, order: 1}}
                        xs={{span: 12, order: 12}}
                    >
                        <CoursesGrid
                            AllCourses={this.state.AllCourses}
                            SelectedCourses={this.state.SelectedCourses}
                        />
                    </Col>
                    <Col 
                        sm={{span: 3, order: 12}}
                        xs={{span: 12, order: 1}}
                    >
                        <CartView
                            SelectedCourses={this.state.SelectedCourses}
                        />
                    </Col>
                </Row>
            </AppWrapper>
        );
    }
}

export default App;