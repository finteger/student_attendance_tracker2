const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers.js');

//views
router.get('/login', (req, res) =>{ res.render('login')});
router.get('/register', (req, res) =>{ res.render('register')});

//create routes for controller actions
router.post('/login', authController.login);
router.post('/register', authController.register);
//router.post('/logout', authController.logout);


module.exports = router;