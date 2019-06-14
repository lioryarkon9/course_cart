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