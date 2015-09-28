var mongoose = require('mongoose');

var sia451Schema = mongoose.Schema({
   _id: Number,
   properties: {
      'Erstellungsdatum'        : {type: Date,   index:true},
      'Schnittstellenversion'   : {type: Number, index:false},
      'Fehlerstufe'             : {type: Number, index:false, default: 0},
      'Prüfung'                 : {type: Number, index:false},
      'Bauherrenkurzbezeichnung': {type: String, index:false},
      'Dokumenten-Urheber'      : {type: String, index:false},
      'Sprachcode'              : {type: String, index:false},
      'Stellung'                : {type: String, index:false},
      'Dokumentencode'          : {type: String, index:false},
      'Dokuementenstatus'       : {type: String, index:false},
      'Vergabeeinheit'          : {type: String, index:false},
      'Hilfsnummerierung'       : {type: String, index:false},
      'Datenträgernummer'       : {type: String, index:false},
      'Dokuementenversion'      : {type: String, index:false},
      'Projektidentifikation'   : {type: String, index:false},
      'Projektbezeichnung'      : {type: String, index:false},
      'Dokumentenidentifikation': {type: String, index:false},
      'Vergabeeinheit'          : {type: String, index:false},
      'Softwarehersteller'      : {type: String, index:false},
      'Telefon'                 : {type: String, index:false},
      'Programmversion'         : {type: String, index:false}
   },
   positionen: [{
      'Recordart'               : {type: String, index: false},
      'Kapitelnummer'           : {type: Number, index: false},
      'leer1'                   : {type: String, index: false},
      'Ausgabejahr'             : {type: Number, index: false},
      'Leistungsposition'       : {type: Number, index: false},
      'Variablennummer'         : {type: Number, index: false},
      'Zeilennummer'            : {type: Number, index: false},
      'Objektgliederung'        : {type: String, index: false},
      'Positionslage'           : {type: String, index: false},
      'Variantengruppe'         : {type: String, index: false},
      'Variante'                : {type: String, index: false},
      'Verbandskalkulation'     : {type: String, index: false},
      'Recordtyp'               : {type: String, index: false},
      'leer2'                   : {type: String, index: false},
      'Mengenart'               : {type: String, index: false},
      'Vorzeichen'              : {type: String, index: false},
      'Menge'                   : {type: String, index: false},
      'Mengeneinheit'           : {type: String, index: false},
      'leer3'                   : {type: String, index: false},
      'Vorzeichen Preis'        : {type: String, index: false},
      'Preis'                   : {type: String, index: false},
      'Laufnummer'              : {type: String, index: false},
      'KAG-Code'                : {type: String, index: false},
      'Elementcode'             : {type: String, index: false},
      'Positionstext'           : {type: String, index: false},
      'Spezielle Codierungen'   : {type: String, index: false}
}]
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


