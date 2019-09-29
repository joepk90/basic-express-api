const express = require('express');
const router = express('router');


router.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'hello'} )
});

module.exports = router;