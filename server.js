var express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy =require("passport-local"),
    User = require("./models/user"),
    app = express();


mongoose.connect('mongodb://localhost/task-manager', {
    useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));


// basic routes==========================
app.get("/", function (req, res) {
    res.redirect("home")
})

app.get("/home", function (req, res) {
    res.render("home")
})


//login routes==========================
app.get("/login", function (req, res) {
    res.render("login")
})



// sign up routes ======================
app.get("/signup", function (req, res) {
    res.render("signup")
})

app.post('/signup', (req, res) => {
    const user = new User(req.body)
     if(user.password !== user.confirmpassword){
         res.send("password and confirm password doesn't match")
     } 
     else{
        user.save().then(() => {
            res.send(user)
            console.log(user)
            
        }).catch((e) => {
            res.status(400).send(e)
        })
     }   

   
})

app.get("/dashboard", function (req, res) {
    res.render("dashboard")
})


app.listen("3000", function () {
    console.log("server has started at port 3000")
}) 
