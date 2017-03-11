var express = require('express'); 
    bodyParser = require('body-parser'); 
    stateHandler = require('./lib/state_handler.js'); 

var app = express(); 

app.set('port', (process.env.PORT || 5000)); 
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.post('/index', function(req, res, cb){
    stateHandler(req, function(result){
        console.log("Someone connected to index");
        res.writeHeader(200, {"Content-type":"text/html"});
        res.write("hello world"); 
        res.end(); 
        return cb(); 
    }); 
}); 

app.listen(app.get('port'), function() {
    console.log("le serveur ecoute sur %s", app.get('port')); 
});