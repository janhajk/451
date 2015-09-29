/**
* Created with 451.
* User: janhajk
* Date: 2015-08-31
* Time: 11:19 AM
* To change this template use Tools | Templates.
*/

var config   = require(__dirname + '/config.js');
var express  = require('express');
var path     = require('path');
var fs       = require('fs');

var utils    = require(__dirname + '/lib/utils.js');

var db       = require(__dirname + '/database/database.js');

var multer   = require('multer');
var upload   = multer();

var app = express();
app.configure(function(){
  app.use(express.compress());
  app.set('port', process.env.PORT || config.port);
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// Asynchronous
var auth = express.basicAuth(function(user, pass, callback) {
 var result = (user === config.username && pass === config.password);
 callback(null /* error */, result);
});

app.get('/', auth, function(req, res) {
    fs.readFile(__dirname + '/public/index.html', 'utf-8', function (err, data) {
        res.send(data);
    });
});


/* *** ajax get sample
app.get('/movies', auth, function(req, res) {
    db.movie.get(function(err, movies) {
        res.json(movies);
    });
});
*/

app.post('/fileupload', auth, upload.single('file'), function (req, res, next) {
   console.log(req.file);
   var content = req.file.buffer.toString();
   console.log(content);
   res.send('Die Datei wurde erfolgreich hochgeladen!');
})

/**
 * ajax post sample

app.post('/site/links', auth, function(req, res) {
    var engine   = require(__dirname + '/lib/engine.js');
    engine.linkEngine(req.body.sites, function(content){
        res.json(content);
    });
});
 */

/**
 * delete sample

app.delete('/files/:filename/delete', auth, function(req, res) {
    var file = path.join(config.fPath, req.param('filename'));
    fs.unlink(file, function(err) {
        utils.log('-'); utils.log('Deleted file: ' + file);
        res.json(err);
    });
});
 */




// Connects app to mongo database
db.connect(function() {
    app.listen(app.get('port'));
    /*
     * cronjobs
     *
     */
    // Start first cronrun after 6 seconds
    setTimeout((function() {})(), 6000);

    setInterval((function() {

    })(), 3600*1000);
});

