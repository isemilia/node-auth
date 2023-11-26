const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;