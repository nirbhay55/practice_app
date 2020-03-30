const mongoose = require('mongoose');
const validator = require('validator');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        minlength: 8
    
    }
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema); 