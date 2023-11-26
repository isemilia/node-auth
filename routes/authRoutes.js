const express = require('express');
const {
    getLogin,
    postLogin,
    getSignup,
    postSignup
} = require('../controllers/authController');

const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/login', getLogin);
router.post('/login', postLogin);

module.exports = router;