const mongoose = require('mongoose');
const { matches } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        lowercase: true,
        validate: [(value) => matches(value, /[A-Za-z0-9]*/), 'Only letters and numbers'],
        minlength: [3, 'At least 3 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'At least 6 characters']
    }
});

// add a static method to the schema
userSchema.statics.login = async function ({ username, password }) {
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error('Incorrect username')
    }

    // password that hasn't been hashed, hashed password
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        return user
    } else {
        throw new Error('Incorrect password');
    }
}
// fire before saving a user
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;