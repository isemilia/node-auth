const mongoose = require('mongoose');
const { matches } = require('validator');

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

// fire a function after saving a user

// on "save" event, doc that was saved, next middleware
userSchema.post('save', function (doc, next) {
    console.log('new user has been created');
    next();
});

// fire a function before saving a user
userSchema.pre('save', function (next) {
    // this refers to the instance of the user that will be created
    console.log('user about to be created', this);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;