const EXPRESS = require('express'), BODY_PARSER = require('body-parser'), PATH = require('path');
const FS = require('fs');

const App = EXPRESS(); // initializing app with express server software

// App.use is a method for implementing middleware
App.use(BODY_PARSER.json());
App.use(BODY_PARSER.urlencoded({ extended: true }));
App.use(EXPRESS.static(PATH.join(__dirname, 'react-client/build'))); // serving static files from html document

const Server = App.listen(process.env.PORT || 5000, function () {
    let host = Server.address().address, port = Server.address().port;
    console.info('datorama_test_app listening at http://%s:%s', host, port);
});

App.get('/', function (req, res) {
    res.sendFile(__dirname + '/react-client/build/index.html');
});

App.get('/get_courses', async function (req, res) {
    let processRes = null;
    const Courses = await getCourses();
    if (Courses.status) {
        processRes = Courses.data;
    } else {
        processRes = [];
    }
    
    res.json(processRes);
});

function getCourses () {
    return new Promise((res, rej) => {
        FS.readFile('./assets/courses.json', function (err, data) {
            if (err) return rej({status: false, message: err});
            const jsonData = JSON.parse(data);
            return res({status: true, data: jsonData});
        });
    });
}