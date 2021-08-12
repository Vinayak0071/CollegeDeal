const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { isLoggedIn } = require('../middleware');
const users = require('../controllers/users');
const { route } = require('./products');

router.route('/register')
    .get(users.register)
    .post(users.registerRender)

router.route('/login')
    .get(users.login)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginRender)

router.route('/logout')
    .get(users.logout)

module.exports = router;