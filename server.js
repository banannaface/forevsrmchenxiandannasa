// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
const mongoURI = 'mongodb://anna:wannabearockstar@ds012678.mlab.com:12678/agtutsdtbs';

// Using `mongoose.connect`...
var promise = mongoose.connect(mongoURI, {
  useMongoClient: true,
  /* other options */
});

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Models
/*var tuts = mongoose.model('tutorial', {
    type: {type: String, required: true},//para/title
    topic: {type: String, required: true}, //cir/par/ell/hyp
    lesson: {type: String, required: true},//def/sol
    content: {type: String, required: true},//content
    num: Number//pangilan
});

var quiz = mongoose.model('quiz', {
    topic: {type: String, required: true}, //cir/par/ell/hyp
    question: {type: String, required: true},
    choice1: {type: String, required: true},
    choice2: {type: String, required: true},
    choice3: String,
    choice4: String,
    num: Number//pangilan
});*/
var Schema = mongoose.Schema;
var tuts = new Schema({
    type: {type: String, required: true},//para/title
    topic: {type: String, required: true}, //cir/par/ell/hyp
    lesson: {type: String, required: true},//def/sol
    content: {type: String, required: true},//content
    num: Number//pangilan
}, {collection: 'tutorial'});

var quiz = new Schema({
    topic: {type: String, required: true}, //cir/par/ell/hyp
    question: {type: String, required: true},
    choice1: {type: String, required: true},
    choice2: {type: String, required: true},
    choice3: String,
    choice4: String,
    num: Number//pangilan
}, {collection: 'quiz'});

var tutmod = mongoose.model('tutorial', tuts);
var quizmod = mongoose.model('quiz', quiz);



// Routes

    // Get reviews
    app.get('/api/tutorials', function(req, res) {

        console.log("fetching tutorials");

        // use mongoose to get all reviews in the database
        tutmod.find(function(err, tutorials) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(tutorials); // return all reviews in JSON format
        });
    });

    app.get('/api/quiz', function(req, res) {

        console.log("fetching quizzes");

        // use mongoose to get all reviews in the database
        quizmod.find(function(err, quizzes) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(quizzes); // return all reviews in JSON format
        });
    });

    /*/ create review and send back all reviews after creation
    app.post('/api/reviews', function(req, res) {

        console.log("creating review");

        // create a review, information comes from request from Ionic
        Review.create({
            title : req.body.title,
            description : req.body.description,
            rating: req.body.rating,
            done : false
        }, function(err, review) {
            if (err)
                res.send(err);

            // get and return all the reviews after you create another
            Review.find(function(err, reviews) {
                if (err)
                    res.send(err)
                res.json(reviews);
            });
        });

    });*/

    /*/ delete a review
    app.delete('/api/reviews/:review_id', function(req, res) {
        Review.remove({
            _id : req.params.review_id
        }, function(err, review) {

        });
    });*/


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");