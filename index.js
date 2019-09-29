
const config = require('config');

// debuging configuration
const startupDebugger = require('debug')('app:startup'); // $ export DEBUG=app:startup
const dbDebugger = require('debug')('app:db'); // $ export DEBUG=app:db 

// to see multiple debug messages:
// $ export DEBUG=app:startup,app:db

// to see all DEBUG messages:
// $ export DEBUG=*

// express middleware dependancies
const helmet = require('helmet'); // sets various headers to increase your apps security
const morgan = require('morgan'); // generates access logs. by defualt logs are printed to the console

// express dependancies
const Joi = require('joi'); 
const express = require('express');

// custom requires
const logger = require('./middleware/logger'); 
const authenticate = require('./middleware/authentication');
const courses = require('./routes/courses');
const home = require('./routes/home');

// start application
const app = express();

app.set('view engine', 'pug'); // [pug, mustache, EJS] (pug is jade)
// app.set('views', './views'); // default is ./views


// express default middleware
app.use(express.json());
app.use(express.urlencoded( { extended: true } )); // accept url encoded requests (key=value&key&value)
app.use(express.static('public')); // serve static content (http://localhost:3000/readme.txt)

// express middleware addons
app.use(helmet());

// default is development
// to change environement, run $ export NODE_ENV=production
// check environment: (process.env.NODE_ENV)
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled...');
}

// configuration
console.log(`Application Name: ${config.get('name')}`)
console.log(`Mail Server: ${config.get('mail.host')}`)

// custom-environment-variables.json file is used to define mapping of custom variables.
// to set custom variables, use $export VARIABLE_NAME=VARIABLE_VALUE
console.log(`Mail Password: ${config.get('mail.password')}`)

// custom middleware
app.use(logger);
app.use(authenticate);

// routes
app.use('/', home);
app.use('/api/courses', courses);

// db work
dbDebugger('example: connected to the database');

// $ export PORT=5000
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}...`))
// app.post();
// app.put();
// app.delete();