var express      = require("express"),
    mongoose     = require("mongoose"),
    bodyparser   = require("body-parser"),
    User         = require("./models/user"),
    //methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    app          = express();


mongoose.connect("mongodb://localhost/recruitment_portal",{useNewUrlParser:true,useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));



app.use(require("express-session")({
    secret: "boom boom",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// basic routes===========================================================
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

app.post("/signup", function (req, res) {
    const user = new User(req.body)
     if(user.password !== user.confirmpassword){
        return res.send("password and confirm password doesn't match")
     } 
    var newUser = new User({ username: req.body.username, email:req.body.email  });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("signup")
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/home")
        })
    })
})

app.get("/dashboard", function (req, res) {
    res.render("dashboard")
})


app.listen("3000", function () {
    console.log("server has started at port 3000")
}) 
