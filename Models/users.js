const mongoose = require('mongoose');

// Defining the schema for employee accounts
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
            },
        email: {
            type: String,
            required: true,
            unique: true
            },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('users', userSchema);
module.exports = User;