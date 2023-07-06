const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    nim: {
        type: String,
        required: true,
        minlength: 9,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        match:  /^[\w-]+(\.[\w-]+)*@polban\.ac\.id$/,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema, "Users")