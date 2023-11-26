const User = require('../models/user');

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
        console.log(e);
        res.status(400).json({ message: 'Could not create user' });
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