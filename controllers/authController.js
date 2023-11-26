const User = require('../models/user');

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
        res.status(201).json(user);
    } catch (e) {
        const errors = handleError(e);
        res.status(400).json({ message: 'Could not create user', errors });
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