import {
    PRICE, 
    LEVEL, 
    HIGHEST_FIRST, 
    LOWEST_FIRST,
    BEGINNER,
    MID_LEVEL,
    ADVANCED
} from '../consts';


export function handleFetchErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

export function writeCoursesErrToConsole (err) {
    console.error(err);
    console.error('you are working without server, please run "npm start" from root directory and go to http://localhost:5000/ in your browser');
    console.warn('using mock data');
}

export function isObjectInList (objId, list) {
    let res = false;
    const RequestedObj = list.find(obj => obj.id === objId);
    if (RequestedObj) res = true;
    return res;
}


export function searchCourseByTitle (input, coursesList) {
    if (!input) return [];
    const lowerCasedInput = input.toLowerCase();
    const regex = new RegExp(lowerCasedInput, 'g');
    const SomeCourses = coursesList.filter(item => {
        let isMatch = regex.test(item.title.toLowerCase());
        return isMatch;
    });

    return SomeCourses.length === coursesList.length ? [] : SomeCourses;
}

export function sortObjectListByPrice (objectList, order = HIGHEST_FIRST) {
    return objectList.sort((a, b) => {
        switch (order) {
            case LOWEST_FIRST:
                if (a[PRICE] > b[PRICE]) return 1; // [1,2] -> [1,2]
                else if (a[PRICE] < b[PRICE]) return -1; // [2,1] -> [1,2]
                else return 0; // [1,1] -> [1,1]
            case HIGHEST_FIRST:
                if (a[PRICE] > b[PRICE]) return -1; // [1,2] -> [2,1]
                else if (a[PRICE] < b[PRICE]) return -1; // [2,1] -> [2,1]
                else return 0; // [1,1] -> [1,1]
            default:
                return 0;
        }
    });
}

export function sortObjectListByLevel (objectList, order = HIGHEST_FIRST) {
    const LevelMap = new Map();
    LevelMap.set(BEGINNER, 1);
    LevelMap.set(MID_LEVEL, 2);
    LevelMap.set(ADVANCED, 3);
    return objectList.sort((a, b) => {
        switch (order) {
            case LOWEST_FIRST:
                if (LevelMap.get(a[LEVEL]) > LevelMap.get(b[LEVEL])) return 1;
                else if (LevelMap.get(a[LEVEL]) < LevelMap.get(b[LEVEL])) return -1;
                else return 0;
            case HIGHEST_FIRST:
                if (LevelMap.get(a[LEVEL]) > LevelMap.get(b[LEVEL])) return -1;
                else if (LevelMap.get(a[LEVEL]) < LevelMap.get(b[LEVEL])) return 1;
                else return 0;
            default:
                return 0;
        }
    });
}