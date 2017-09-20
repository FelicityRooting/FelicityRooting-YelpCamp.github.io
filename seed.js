var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg",
        description: "Why should those who come to White County to experience the outdoors have to sleep under a roof? Bring your tent, hammock, or camper to one of our quiet campgrounds and experience waking to the sounds of nature, and bedding to the crackle of the campfire. Don’t just experience the outdoors—be a part of it."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm9.staticflickr.com/8486/8240036928_1a31fbbe9e.jpg",
        description: "Why should those who come to White County to experience the outdoors have to sleep under a roof? Bring your tent, hammock, or camper to one of our quiet campgrounds and experience waking to the sounds of nature, and bedding to the crackle of the campfire. Don’t just experience the outdoors—be a part of it."
    },
    {
        name: "Ocean Sakura", 
        image: "https://farm5.staticflickr.com/4047/4540485288_457eea0524.jpg",
        description: "Why should those who come to White County to experience the outdoors have to sleep under a roof? Bring your tent, hammock, or camper to one of our quiet campgrounds and experience waking to the sounds of nature, and bedding to the crackle of the campfire. Don’t just experience the outdoors—be a part of it."
    },
]

function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("remove campgrounds!");
            //add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //add a few comments
                        Comment.create({
                            text: "this place is great, but I wish there was internet",
                            author: "harry"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                              campground.comments.push(comment);
                              campground.save();
                              console.log("create a new comment");
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;