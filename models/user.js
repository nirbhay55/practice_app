var mongoose = require('mongoose');

var UserSchema = new mongoose.schema({
    email : {type : Email, required : [true, "can't be blank"]},
    password : {type : String, required : [true, "can't be blank"], minlength: 8}
})

module.exports = mongoose.model("User", UserSchema); 