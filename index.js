var express               = require("express");
var app                   = express();
var bodyParser            = require("body-parser");
var mongoose              = require("mongoose");
var passport              = require("passport");
var LocalStrategy         = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var Campground            = require("./models/campground");
var seedDB                = require("./seed");
var User                  = require("./models/user");
var Comment               = require("./models/comment");
var commentRoutes         = require("./routes/comments"),
    campgroundsRoutes     = require("./routes/campgrounds"),
    indexRoutes           = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp_2");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//seedDB(); //seed the database

//passport configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// Campground.create({
//     name: "Salmon Creek",
//     image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
//     description: "this is a beautiful place."
// } ,function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Newly create campground");
//         console.log(campground);
//     }
// });
// app.use(bodyParser.urlencoded({extended: true}));
// app.set("view engine", "ejs");

// var campgrounds = [
//           {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
//           {name: "Granite Hill", image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"},
//           {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
//           {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
//           {name: "Granite Hill", image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"},
//           {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
//           {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
//           {name: "Granite Hill", image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"},
//           {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"}
// ] 
//use these three routes we required
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundsRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("yelpcamp is running");
});