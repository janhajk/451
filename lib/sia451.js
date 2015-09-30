/**
* Created with 451.
* User: janhajk
* Date: 2015-08-31
* Time: 11:40 AM
* To change this template use Tools | Templates.
*/

var utils    = require(__dirname + '/../lib/utils.js');

var fRecord = {
   // Header Record (logischer Beginn) mit Dokumenteninformation
   A: [
      {name: 'Recordart', length: 1},
      {name: 'Erstellungsdatum', length: 6, format: function(s){return new Date('20' + s.substr(4,2), s.substr(2,2), s.substr(0,2), 12, 0, 0, 0);}},
      {name: 'Schnittstellenversion', length: 6},
      {name: 'Fehlerstufe', length: 2},               // Reserviert für Prüfprogramme
      {name: 'Prüfung', length: 2},                   // Durchgeführte Prüfung (reserviert für Prüfprogramme)
      {name: 'Bauherrenkurzbezeichnung', length: 12},
      {name: 'Dokumenten-Urheber', length: 12},
      {name: 'Sprachcode', length: 1},
      {name: 'Stellung', length: 1},                  // Stellung zur Vorversion (A=Änderung; B=Nachtrag, Ergänzung)
      {name: 'Dokumentencode', length: 1},            // Dokumenten-Code (A=Ausmass; B=Ausschreibung; C=Angebot; D=Vertrag; E=Teilrechnung; F=Situationsrechnung)
      {name: 'Dokumentenstatus', length: 1},          // (A=Entwurf; B=Provisorisch gültig; C=Gültig; D=Storno)
      {name: 'Vergabeeinheit', length: 15},           // Nr./Code
      {name: 'Hilfsnummerierung', length: 4},         // z.B. Nachtragsnummer bei Verträgen, Rechnungsnummer innerhalb von Verträgen
      {name: 'Datenträgernummer', length: 12},        //
      {name: 'Dokumentenversion', length: 7},         //
      {name: 'Projektidentifikation', length: 11},    // Kurzbezeichnung
      {name: 'Projektbezeichnung', length: 30},       //
      {name: 'Dokumentenidentifikation', length: 15}, //
      {name: 'Vergabeeinheit', length: 30},           // Vergabeeinheit (Bezeichnung)
      {name: 'Softwarehersteller', length: 20},       // Name Softwarehersteller
      {name: 'Telefon', length: 20},                  // Telefonnummer Softwarehersteller
      {name: 'Programmversion', length: 30}           //
   ],
   // Sekundärgliederungen
   B: [],
   // Konditionen
   C: [],
   // Reserve für Spezielle Bedürfnisse
   D: [], E: [], F: [],
   // Standard Record für Leistungsverzeichnisse nach NPK Bau
   G: [
      {name: 'Recordart', length: 1},
      {name: 'Kapitelnummer', length: 3},
      {name: 'leer1', length: 1},
      {name: 'Ausgabejahr', length: 2},
      {name: 'Leistungsposition', length: 6},
      {name: 'Variablennummer', length: 2},
      {name: 'Zeilennummer', length: 2, format: function(i){i=parseInt(i);return isNaN(i)?1:i;}},
      {name: 'Objektgliederung', length: 6},
      {name: 'Positionslage', length: 6},
      {name: 'Variantengruppe', length: 3},
      {name: 'Variante', length: 3},
      {name: 'Verbandskalkulation', length: 6},
      {name: 'Recordtyp', length: 1},
      {name: 'leer2', length: 1},
      {name: 'Mengenart', length: 1},
      {name: 'Vorzeichen', length: 1},
      {name: 'Menge', length: 13, format: function(i){i=parseInt(i);return isNaN(i)?0:i/1000;}},
      {name: 'Mengeneinheit', length: 2},
      {name: 'leer3', length: 1},
      {name: 'Vorzeichen Preis', length: 1},
      {name: 'Preis', length: 12},
      {name: 'Laufnummer', length: 7},
      {name: 'KAG-Code', length: 5},
      {name: 'Elementcode', length: 6},
      {name: 'Positionstext', length: 30},
      {name: 'Spezielle Codierungen', length: 134}
   ],
   // Reserve für spezielle Bedürfnisse
   U: [], V: [], W:[], X: [], Y: [],
   // Schlussrecord (logisches Ende) mit Dokumenteninformation
   Z: [
      {name: 'Recordart', length: 1},
      {name: 'Exportdatum', length: 6, format: function(s){return new Date('20' + s.substr(4,2), s.substr(2,2), s.substr(0,2), 12, 0, 0, 0);}},
      {name: 'Erstellungsdatum', length: 6, format: function(s){return new Date('20' + s.substr(4,2), s.substr(2,2), s.substr(0,2), 12, 0, 0, 0);}},
      {name: 'leer1', length: 4},                     // Reserviert für Prüfprogramme
      {name: 'Absender', length: 12},
      {name: 'Urheber', length: 12},
      {name: 'leer2', length: 4},
      {name: 'Anz-Austauschrecords', length: 13},                  // Stellung zur Vorversion (A=Änderung; B=Nachtrag, Ergänzung)
      {name: 'leer3', length: 3},            // Dokumenten-Code (A=Ausmass; B=Ausschreibung; C=Angebot; D=Vertrag; E=Teilrechnung; F=Situationsrechnung)
      {name: 'Fortsetzung', length: 1},          // (A=Entwurf; B=Provisorisch gültig; C=Gültig; D=Storno)
      {name: 'Datenträgernummer', length: 12},           // Nr./Code
      {name: 'Version-Bezugsdokument', length: 7},         // z.B. Nachtragsnummer bei Verträgen, Rechnungsnummer innerhalb von Verträgen
      {name: 'Projekt-Identifikation', length: 11},        //
      {name: 'Projektbezeichnung', length: 30},         //
      {name: 'BezugsdokumentId', length: 15},    // Kurzbezeichnung
      {name: 'Sachbearbeiterfirma', length: 30},       //
      {name: 'Telefonnummer', length: 20}, //
      {name: 'Name', length: 20},           // Vergabeeinheit (Bezeichnung)
   ],
};


/*
 * Parst eine Datei und liest die einzelnen Zeilen ein
 */
var parseString = function(string, callback) {
   var lines = splitStringByLines(string);
   var line, type, i, counter=-1;
   for(i = 0; i < lines.length; i++) {
      type = lines[i].substring(0,1);
      if (typeof fRecord[type] !== 'undefined'){
         line = parseRecord(lines[i], type);
         if (line.Zeilennummer > 1) {
            lines[counter].Positionstext += "\n" + line.Positionstext;
         }
         else {
            counter++;
            lines[counter] = line;
         }
      }
   }
   callback(lines);
};
exports.parseString = parseString;


/*
 * Parst eine Zeile
 */
var parseRecord = function(string, type) {
   var record = {};
   var pos = 0;
   var form = fRecord[type];
   for (var i = 0; i<form.length;i++){
      record[form[i].name] = string.substr(pos, form[i].length).trim();
      if (form[i].format !== undefined){
         record[form[i].name] = form[i].format(record[form[i].name])
      }
      pos = pos + form[i].length;
   }
   return record;
};


/*
 * Teilt ein String nach Umbrüchen
 */
var splitStringByLines = function(str) {
   return str.match(/[^\r\n]+/g);
};



/*
 ********  DEPECRATED: Parst eine Datei und liest die einzelnen Zeilen ein ******************

var parseFile = function(file, callback) {
   openFile(file, function(err, fileString) {
      var lines = splitStringByLines(fileString);
      var line, pos=1, type, i;
      for(i = 0; i < lines.length; i++) {
         type = lines[i].substring(0,1);
         (typeof fRecord[type] !== 'undefined') && (lines[i] = parseRecord(lines[i], type));
      }
      callback(lines);
   });
};

var openFile = function(file, callback) {
    fs.readFile(file, function (err, data) {
        if (err) {throw err;}
        utils.log(data);
        callback(err, data);
    });
};

*/