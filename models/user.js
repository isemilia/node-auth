const mongoose = require('mongoose');
const { matches } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        lowercase: true,
        validate: [(value) => matches(value, /[A-Za-z0-9]*/), 'Only letters and numbers']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'At least 6 characters']
    }
});

// fire before saving a user
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;