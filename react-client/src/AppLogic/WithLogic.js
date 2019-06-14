import React from 'react';
import {
    handleFetchErrors, 
    writeCoursesErrToConsole, 
    isObjectInList,
    searchCourseByTitle
} from '../utils';
import MOCK_DATA from '../assets/mock_data/courses.json';


const WithLogic = App => {
    return class AppLogic extends React.Component {
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
        addToSelected (courseId) {
            const AllCourses = this.state.AllCourses;
            const SelectedCourses = this.state.SelectedCourses;
            const RequestedObj = AllCourses.find(obj => obj.id === courseId);
            if (RequestedObj) {
                if (!isObjectInList(courseId, SelectedCourses)) {
                    let updatedSelected = Array.from(SelectedCourses);
                    updatedSelected.push(RequestedObj);
                    this.setState({SelectedCourses: updatedSelected});
                } else {
                    window.alert('course "' + RequestedObj.title + '" already in cart');
                }
            }
        }
        removeFromSelected (courseId) {
            const SelectedCourses = this.state.SelectedCourses;
            const RequestedObj = SelectedCourses.find(obj => obj.id === courseId);
            if (RequestedObj) {
                const UpdatedSelected = SelectedCourses.filter(item => item.id !== RequestedObj.id);
                this.setState({SelectedCourses: UpdatedSelected});
            } else {
                window.alert('cannot remove course not in cart');
            }
        }
        onChangeSearchInput (event) {
            const input = event.currentTarget.value;
            const AllCourses = Array.from(this.state.AllCourses);
            this.setState({searchValue: input});
            let searchResults = searchCourseByTitle(input, AllCourses);
            this.setState({searchOptions: searchResults});
        }
        render () {
            return (
                <App
                    {...this.props}
                    setCourses={this.setCourses}
                    getCoursees={this.getCoursees}
                    addToSelected={this.addToSelected}
                    removeFromSelected={this.removeFromSelected}
                    onChangeSearchInput={this.onChangeSearchInput}
                />
            );
        }
    }
}

export default WithLogic;