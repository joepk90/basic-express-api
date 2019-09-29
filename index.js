const Joi = require('joi');  
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/', (reg, res) => {
    res.send('hello world!');
});

// return all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// return course by id
app.get('/api/courses/:id', (req, res) => {

    // check if the course exists
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // if course id does not exist return 404
    if(!course) res.status(404).send('The course with the given ID was not found.')

    // else return the course data
    res.send(course); 

});

// example date params
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });

// example query
// app.get('/api/posts', (req, res) => {
//     res.send(req.query);
// });


// post request test. each post will return a response with the course data inreasesd by.
// this can be tested in postman.
app.post('/api/courses', (req, res) => {

// basic validation example
// if (!req.body.name || req.body.name.length < 3) {
//     res.status(400 ).send('name is required and should be minimum 4 characters');
//     return;
// }

// validation using joi dependancy
const schema = {
    name: Joi.string().min(3).required()
}

const result = Joi.validate(req.body, schema);
if (result.error) {
    res.status(400 ).send(result.error.details[0].message);
        return;
}

    

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


// $ export PORT=5000
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}...`))
// app.post();
// app.put();
// app.delete();