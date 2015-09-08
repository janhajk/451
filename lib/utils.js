var fs       = require('fs');
var config   = require(__dirname + '/../config.js');


var getFilesizeInBytes = function(filename) {
    return (fs.statSync(filename)).size;
};
exports.getFilesizeInBytes = getFilesizeInBytes;



var log = function(log) {
    if(config.dev) {
        if (log === '-') log = '------------------------------------------';
        console.log(log);
    }
};
exports.log = log;








