//============================
// campgrounds routes
//============================
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
router.get("/", function(req, res) {
    console.log(req.user);
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});     
        }
    })
});

router.post("/", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    //campgrounds.push(newCampground);
    //create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });

});

router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {
    // Campground.find({}, function(err, allCampgrounds) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.render("campgrounds", {campgrounds: allCampgrounds});     
    //     }
    // });
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campgrounds: foundCampground});
        }
    });
});

module.exports = router;