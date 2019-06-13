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