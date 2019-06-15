import React from 'react';
import {
    handleFetchErrors, 
    writeCoursesErrToConsole, 
    isObjectInList,
    searchCourseByTitle,
    sortObjectListByPrice,
    sortObjectListByLevel,
    isItemInLocalStorage
} from '../utils';
import {PRICE, LEVEL, COURSE_LOCAL_STORAGE_PREFIX} from '../consts';
import MOCK_DATA from '../assets/mock_data/courses.json';


const WithLogic = App => {
    return class AppLogic extends React.Component {
        async setCourses () {
            const Courses = await this.getCoursees();
            this.setState({AllCourses: Courses});

            const LocalStorageCartItems = Courses.filter(item => {
                let lcItem = this.getCartItemFromLocalStorage(item.id);
                if (lcItem) return true;
                else return false;
            });
            if (LocalStorageCartItems.length) {
                this.setState({SelectedCourses: LocalStorageCartItems});
            }
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
                    this.prsistCartItemToLocalStorage(RequestedObj);
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
                this.removeCartItemFromLocalStorage(COURSE_LOCAL_STORAGE_PREFIX + RequestedObj.id);
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
        sortCoursesByParam (sortParam) {
            if (!sortParam) return;
            const AllCourses = Array.from(this.state.AllCourses);
            const SearchOptions = Array.from(this.state.searchOptions);
            let sortedAllCourses, sortedSearchOptions;
            switch (sortParam) {
                case PRICE:
                    sortedAllCourses = sortObjectListByPrice(AllCourses);
                    sortedSearchOptions = sortObjectListByPrice(SearchOptions);
                    break;
                case LEVEL:
                    sortedAllCourses = sortObjectListByLevel(AllCourses);
                    sortedSearchOptions = sortObjectListByLevel(SearchOptions);
                    break;
                default:
                    console.error('something went wrong sorting');
            }

            this.setState({
                AllCourses: sortedAllCourses,
                searchOptions: sortedSearchOptions
            });
        }
        prsistCartItemToLocalStorage (cartItem) {
            if (!isItemInLocalStorage(COURSE_LOCAL_STORAGE_PREFIX + cartItem.id)) {
                window.localStorage.setItem(COURSE_LOCAL_STORAGE_PREFIX + cartItem.id, JSON.stringify(cartItem));
            } 
        }
        getCartItemFromLocalStorage (cartItemId) {
            let res;
            const LocalStorageItem = window.localStorage.getItem(COURSE_LOCAL_STORAGE_PREFIX + cartItemId);
            if (LocalStorageItem) {
                res = JSON.parse(LocalStorageItem)
            } 

            return res;
        }
        removeCartItemFromLocalStorage (searchKey) {
            window.localStorage.removeItem(searchKey);
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
                    sortCoursesByParam={this.sortCoursesByParam}
                    prsistCartItemToLocalStorage={this.prsistCartItemToLocalStorage}
                    removeCartItemFromLocalStorage={this.removeCartItemFromLocalStorage}
                    getCartItemFromLocalStorage={this.getCartItemFromLocalStorage}
                />
            );
        }
    }
}

export default WithLogic;