const express = require('express');
const router = express('router');

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

// return all courses
router.get('/', (req, res) => {
    res.send(courses);
});

// return course by id
router.get('/:id', (req, res) => {

    // check if the course exists
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // if course id does not exist return 404
    if(!course) {
        return res.status(404).send('The course with the given ID was not found.')
    }

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
router.post('/', (req, res) => {

// basic validation example
// if (!req.body.name || req.body.name.length < 3) {
//     res.status(400 ).send('name is required and should be minimum 4 characters');
//     return;
// }

 // object destructoring
 const { error } = validateCourse(req.body);
 if (error) {
    return res.status(400 ).send(error.details[0].message);
 }

    

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// example PUT request
router.put('/:id', (req, res) => {

    // check if the course exists
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // if course id does not exist return 404
    if(!course) {
        return res.status(404).send('The course with the given ID was not found.');
    }

    // object destructoring
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400 ).send(error.details[0].message);
    }

    course.name = req.body.name
    res.send(course);

});

// delete course
router.delete('/:id', (req, res) => {

    // check if the course exists
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // if course id does not exist return 404
    if(!course) {
        return res.status(404).send('The course with the given ID was not found.')
    }

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return course that has been deleted
    res.send(course); 

});

function validateCourse(course) {

    // validation using joi dependancy
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);

}

module.exports = router;