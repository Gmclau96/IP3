const express = require('express');
const router = express.Router();
const controller = require('../controllers/ip3Controller.js');
const { authenticate } = require('../auth/auth.js');
const { loggedIn } = require('../auth/auth.js');

//GET & POST index page
router.get("/", authenticate,  controller.get_landing);
router.get('/login', controller.get_login);

//GET & POST signup page
router.get('/signup', controller.get_signup);
router.post('/signup', controller.post_signup);

//GET reset password page
router.get('/password', controller.get_password);

//GET & POST account page
router.get('/account', authenticate, loggedIn, controller.get_account);
router.get('/account/:id', authenticate, loggedIn, controller.updateAccount);
router.post('/updateAccountDetails/:id', authenticate, loggedIn, controller.updateAccountDetails);
router.post('/deleteAccount/:id', authenticate, loggedIn, controller.deleteAccount);

//GET & POST Admin page
router.get('/admin', authenticate, loggedIn, controller.get_admin);
router.get('/admin/:id', authenticate, loggedIn, controller.adminDisplayUser);
router.post('/adminUpdate/:id', authenticate, loggedIn, controller.adminUpdate);
router.post('/adminDelete/:id', authenticate, loggedIn, controller.adminDelete);

//GET & POST lists page
router.get('/lists', authenticate, controller.get_lists);
router.post('/lists', authenticate, loggedIn, controller.post_lists);
router.get('/lists/:id', authenticate, controller.updateList);
router.post('/updateLists/:id', authenticate, loggedIn, controller.updateLists);
router.post('/deleteLists/:id', authenticate, loggedIn, controller.deleteLists);
//GET Calender page
router.get('/calendar', authenticate, loggedIn, controller.get_calendar);
router.post('/calendar', authenticate, loggedIn, controller.post_calendar)
router.get('/calendar/:id', authenticate, controller.updateEvent);
router.post('/updateEvents/:id', authenticate, loggedIn, controller.updateEvents);
router.post('/deleteEvents/:id', authenticate, loggedIn, controller.deleteEvents);

//GET & POST notes page
router.get('/notes', authenticate, controller.get_notes);
router.post('/notes', authenticate, loggedIn, controller.post_notes);
router.get('/notes/:id', authenticate, controller.updateNote);
router.post('/updateNotes/:id', authenticate, loggedIn, controller.updateNotes);
router.post('/deleteNotes/:id', authenticate, loggedIn, controller.deleteNotes);

//GET & POST recipes page
router.get('/recipes', authenticate, controller.get_recipes);
router.post('/recipes', authenticate, loggedIn, controller.post_recipes);
router.get('/recipes/:id', authenticate, controller.updateRecipe);
router.post('/updateRecipes/:id', authenticate, loggedIn, controller.updateRecipes);
router.post('/deleteRecipes/:id', authenticate, loggedIn, controller.deleteRecipes);

//GET landing page
router.get('/landing', authenticate, controller.get_landing);
router.post('/landing', loggedIn, controller.post_landing);

//GET logout
router.get('/logout', authenticate, controller.get_logout);

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