import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from 'react-bootstrap';
import AppWrapper from './views/AppWrapper';
import CoursesGrid from './views/CoursesGrid';
import CartView from './views/Cart';
import './App.css';
import WithLogic from './AppLogic/WithLogic';


class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            AllCourses: [],
            SelectedCourses: [],
            searchValue: '',
            searchOptions: []
        }
        this.setCourses = this.props.setCourses.bind(this);
        this.getCoursees = this.props.getCoursees.bind(this);
        this.addToSelected = this.props.addToSelected.bind(this);
        this.removeFromSelected = this.props.removeFromSelected.bind(this);
        this.onChangeSearchInput = this.props.onChangeSearchInput.bind(this);
        this.sortCoursesByParam = this.props.sortCoursesByParam.bind(this);
    }
    componentDidMount () {
        this.setCourses();
    }
    render () {
        console.info(this.state);
        return (
            <AppWrapper
                numItemsInCart={this.state.SelectedCourses.length}
            >
                <Row id='App'>
                    <Col 
                        sm={{span: 9, order: 1}}
                        xs={{span: 12, order: 12}}
                    >
                        <CoursesGrid
                            AllCourses={this.state.AllCourses}
                            SelectedCourses={this.state.SelectedCourses}
                            addToSelected={this.addToSelected}
                            removeFromSelected={this.removeFromSelected}
                            onChangeSearchInput={this.onChangeSearchInput}
                            searchValue={this.state.searchValue}
                            searchOptions={this.state.searchOptions}
                            sortCoursesByParam={this.sortCoursesByParam}
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

export default WithLogic(App);