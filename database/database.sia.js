var mongoose = require('mongoose');

var sia451Schema = mongoose.Schema({
    
    /*
    title: { type: String, index: true },
    search: {
        titles: {type: [String], index: true},
        years:  {type: [Number], index: true},
    },
    info: {
        runtime: {type: Number, default: 0},
        year: { type: Number, index: true },
        synopsis: {type: String, default: ''},
        ids: {
            imdb: String,
            tomatoes: Number,
            tmdb: Number,
        },
        ratings: {
            imdb: Number,
            tomatoes: Number,
            tmdb: Number,
        },
        posters: {
            thumbnail: String,
            profile: String,
            original: String
        },
        mpaa_rating: String,
        critics_consensus: String,
        lastUpdated: Date
    },
    sites: [{
        link: String,
        title: String,
        resolution: String,
        pubdate: Date,
        lastRipped: Date
    }],
    links: [{
        link: String,
        type: String,
        status: Number,
        lastChecked: Date
    }],
    resolutions: {type: [String]},
    lastUpdate: {type: Date, index: true},
    dateAdded: Date,
    display: {type: Boolean, default:true, index: true}
    */
});

var sia451 = mongoose.model('sia451', sia451Schema);
exports.model = sia451;


exports.add = function(title, info, callback) {
    Movie.findOne()
        .where('title').equals(title)
        .where('info.year').equals(info.year).exec(function (err, movie) {
            if (movie) {    // Movie already in DB
                callback(movie);
            }
            else {  // Create new Movie in database
                movie = new Movie({title: title, info:info});
                movie.dateAdded = new Date();
                movie.save(function(err) {
                      callback(err, movie);
                });
            }
            return true;
    });
};


/**
 * Reads all Movies from the Database that are on 'display'
 */
exports.get = function(callback) {
    Movie.find({$or: [{display:true}, {display: undefined}]}, function (err, movies) {
        callback(err, movies);
    });
};

exports.findNew = function(callback) {
    Movie.findOne({'info.lastUpdated': undefined}, function (err, movie){
        callback(err, movie);
    });
};

exports.exists = function(movieInput, callback) {
    Movie.findOne({'search.titles': {$regex: '^'+movieInput.title, $options: 'i'}, 'search.years': movieInput.info.year}, function(err, movie) {
        if (movie) {    // Movie already in DB
            callback(true, movie, movieInput);
        }
        else {  // Create new Movie in database
            callback(false, movieInput);
        }
        return true;
    });
};


