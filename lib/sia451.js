/**
* Created with 451.
* User: janhajk
* Date: 2015-08-31
* Time: 11:40 AM
* To change this template use Tools | Templates.
*/

var fs = require('fs');
var utils    = require(__dirname + '/../lib/utils.js');


var openFile = function(file, callback) {
    fs.readFile(file, function (err, data) {
        if (err) throw err;
        utils.log(data);
        callback(err, data);
    });
};

var readFile = function(file, callback) {
    openFile(file, function(err, fileString){
        var lines = fileString.match(/[^\r\n]+/g);
        var line, pos=1;
        for(var i = 0; i<lines.length; i++) {
            if (lines[i].test(/^A.*/)) {
                line = getHeaderRecord(lines[i]);
            }
            elseif (lines[i].test(/^Z.*/)) {
                line = getSchlussrecord(lines[i]);
            }
            else {
                line = getGRecord(lines[i]);
            }
            lines[i] = line;
        }
        callback(lines);
    });
};

var getRecord = function(string) {
    var record = {};
    var pos = 0;
    var form = [
        {name: 'Recordart', length: 1},
        {name: 'Katalog', length: 6},
        {name: 'Leistungsposition', length: 6},
        {name: 'Variablennummer', length: 2},
        {name: 'Zeilennummer', length: 2, format: function(i){i=parseInt(i);return isNaN(i)?1:i},
        {name: 'Objektgliederung', length: 6},
        {name: 'Positionslage', length: 6},
        {name: 'Variantengruppe', length: 3},
        {name: 'Variante', length: 3},
        {name: 'Verbandskalkulation', length: 6},
        {name: 'Recordtyp', length: 1},
        {name: 'Mengenart', length: 1},
        {name: 'Vorzeichen', length: 1},
        {name: 'Menge', length: 13},
        {name: 'Mengeneinheit', length: 2},
        {name: '17', length: 1},
        {name: 'Vorzeichen Preis', length: 1},
        {name: 'Preis', length: 12},
        {name: 'Laufnummer', length: 7},
        {name: 'KAG-Code', length: 5},
        {name: 'Elementcode', length: 6},
        {name: 'Positionstext', length: 30},
        {name: 'Spezielle Codierungen', length: 134}
    ];
    for (var i = 0; i<form.length;i++){
        record[form[i].name] = string.substr(pos, form[i].length).trim();
        if (form[i].format !== undefined){
            record[form[i].name] = form[i].format(record[form[i].name])
        }
        pos = pos + form[i].length;
    }
    return record;
};

var getHeaderRecord = function(string) {
    var header = {};
    var pos = 0;
    var form = [
        {name: 'Recordart', length: 1},
        {name: 'Erstellungsdatum', length: 6, format: function(s){return new Date('20' + s.substr(4,2), s.substr(2,2), s.substr(0,2), 12, 0, 0, 0)}},
        {name: 'Schnittstellenversion', length: 6},
        {name: 'unbekannt1', length: 28},
        {name: 'Fehlerstufe', length: 0},
        {name: 'Prüfung', length: 0},
        {name: 'Bauherrenkurzbezeichnung', length: 0},
        {name: 'Dokumenten-Urheber', length: 0},
        {name: 'Sprachcode', length: 1},
        {name: 'Stellung', length: 1},
        {name: 'Dokumentencode', length: 1},
        {name: 'Dokumentenstatus', length: 1},
        {name: 'unbekannt2', length: 29},
        {name: 'Vergabeeinheit', length: 0},
        {name: 'Hilfsnummerierung', length: 0},
        {name: 'Datenträgernummer', length: 0},
        {name: 'Dokumentenversion', length: 7},
        {name: 'Projektidentifikation', length: 11},
        {name: 'Projektbezeichnung', length: 30},
        {name: 'Dokumentenidentifikation', length: 15},
        {name: 'Vergabeeinheit', length: 30},
        {name: 'Softwarehersteller', length: 20},
        {name: 'Telefon', length: 20},
        {name: 'Programmversion', length: 30},
    ];
    for (var i = 0; i<form.length;i++){
        header[form[i].name] = string.substr(pos, form[i].length).trim();
        if (form[i].format !== undefined){
            header[form[i].name] = form[i].format(header[form[i].name])
        }
        pos = pos + form[i].length;
    }
    return header;
};

/*
 * TODO
 */
var getSchlussrecord = function(file) {
    var regex = new RegExp('^Z.*', 'i');
    var footer = regex.exec(fileString);
    return footer;
};