const User = require('../models/user');
const jwt = require('jsonwebtoken');

// handle errors
const handleError = (e) => {
    console.log(e.message, e.code);
    const errors = {};

    // incorrect email or password
    if (e.message.toLowerCase() === 'incorrect username' || e.message.toLowerCase() === 'incorrect password') {
        errors.username = 'Incorrect username or password'
        errors.password = 'Incorrect username or password'
    }

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

const postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.login({ username, password });

        const token = createToken(user._id);
        res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(200).json({ status: 'success', id: user._id })
    } catch (e) {
        const errors = handleError(e);
        res.status(400).json({ status: 'error', message: 'Could not log in', errors });
    }
};

module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup
}