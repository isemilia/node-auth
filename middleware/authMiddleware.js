const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    // check if token exists and is valid
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            } else {
                console.log(decoded);
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    requireAuth
}