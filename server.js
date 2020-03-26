var express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    //methodOverride = require("method-override"),
    // passport = require("passport"),
    // LocalStrategy = require("passport-local"),
    app = express();


mongoose.connect('mongodb+srv://UserName:<password>@cluster0-8vkls.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));


// restful routes===========================================================
app.get("/", function (req, res) {
    res.redirect("home")
})

app.get("/home", function (req, res) {
    res.render("home")
})

app.get("/login", function (req, res) {
    res.render("login")
})

app.get("/signup", function (req, res) {
    res.render("signup")
})

app.get("/dashboard", function (req, res) {
    res.render("dashboard")
})


app.listen("3000", function () {
    console.log("server has started at port 3000")
}) 
