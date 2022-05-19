const   express = require("express"),
        app     = express(),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
        passport = require('passport'),
        LocalStrategy = require('passport-local'),
        Movie = require("./models/movie"),
        Comment = require("./models/comment"),
        User = require("./models/user"),
        seedDB = require("./seeds.js");

mongoose.connect('mongodb://localhost/theater');
app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extened: true}));
//seedDB();

app.use(require('express-session')({
    secret: 'secret word',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req,res){
    Movie.find({},function(err, allmovie){
        if(err){
            console.log(err);
        } else{
            res.render("home.ejs",{movies:allmovie});
        }
    })
});

app.get("/movies", function(req,res){
    Movie.find({},function(err, allmovie){
        if(err){
            console.log(err);
        } else{
            res.render("movies.ejs",{movies:allmovie});
        }
    })
});

app.post("/movies", function(req,res) {
    let title = req.body.title;
    let genre = req.body.genre;
    let length = req.body.length;
    let director = req.body.director;
    let releaseDate = req.body.releaseDate;
    let description = req.body.description;
    let image = req.body.image;
    let trailer = req.body.trailer;
    let newMovie = {title:title, genre:genre, length:length, director:director, releaseDate:releaseDate, description:description, image:image, trailer:trailer};
    Movie.create(newMovie,function(err, newlyAdded){
        if(err){
            console.log(err);
        } else{
            res.redirect("/movies");
            console.log(newMovie);
        }
    })
});

app.get("/movieinfo/:id", function(req,res){
    Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else{
            res.render("movie_info.ejs", {movie:foundMovie});
        }
    })
});

app.get("/movies/add", function(req,res){
    res.render("admin_movies_add.ejs");
});

app.get("/login", function(req,res){
    res.render("login.ejs");
});

app.listen(3000, function(){
    console.log("Activated");
});