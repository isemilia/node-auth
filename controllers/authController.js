const User = require('../models/user');
const jwt = require('jsonwebtoken');

// handle errors
const handleError = (e) => {
    const errors = {};

    if (e.message.includes('user validation failed:')) {
        Object.values(e.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (e.code && e.code === 11000) {
        errors.username = 'Username is taken';
    }

    return errors;
}

// 3 days in seconds
const maxAge = 3 * 24 * 60 * 60;

// create token
const createToken = (id) => {
    // what to encrypt, secret string, options
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

const getSignup = (req, res) => {
    res.render('signup');
};

const getLogin = (req, res) => {
    res.render('login');
};

const postSignup = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.create({
            username,
            password
        });
        const token = createToken(user._id);

        res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ status: 'success', id: user._id });
    } catch (e) {
        const errors = handleError(e);
        res.status(400).json({ status: 'error', message: 'Could not create user', errors });
    }
};

const postLogin = (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    res.send('user login');
};

module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup
}