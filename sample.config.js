exports.username = 'user1';
exports.password = 'VfKnRe$7gdBf';

exports.database     = "mongodb://localhost/451";
exports.port         = 27017;
exports.cookieSecret = "1234";














// ---------------------
// Only change, if you know, what you're doing
// ---------------------
exports.urlRegex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
exports.emailRegex = new RegExp("^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$");

exports.cacheTime = 60 * 60 * 1000; // 1 hour in milliseconds

exports.dev = false;