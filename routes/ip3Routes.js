const express = require('express');
const router = express.Router();
const controller = require('../controllers/ip3Controller.js');

//GET & POST index page
router.get("/", controller.get_login);
router.get('/login', controller.get_login);
router.post('/login', controller.post_login);
//GET & POST signup page
router.get('/signup', controller.get_signup);
router.post('/signup', controller.post_signup);
//GET reset password page
router.get('/password', controller.get_password);
//GET account page
router.get('/account', controller.get_account);
//GET lists page
router.get('/lists', controller.get_lists);
router.post('/lists', controller.post_lists);
//GET Calender page
router.get('/calendar', controller.get_calendar);
//GET & POST notes page
router.get('/notes', controller.get_notes);
router.post('/notes', controller.post_notes);
//GET recipes page
router.get('/recipes', controller.get_recipes);
router.post('/recipes', controller.post_recipes);
//GET landing page TODO

//404 error
router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
});

//500 error
router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});

module.exports = router;