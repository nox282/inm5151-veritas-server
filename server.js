var express = require('express'); 
var bodyParser = require('body-parser'); 
var stateHandler = require('./lib/state_handler.js'); 
var questionTemplate = require('./lib/question_template.js'); 

var app = express(); 

app.set('port', (process.env.PORT || 5000)); 
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.post('/index', function(req, res, cb){
    console.log("Someone connected to index");
    
    stateHandler(req, function(result){
        res.writeHeader(200, {"Content-type":"text/html"});
        res.write(result); 
        res.end(); 
        return cb(); 
    }); 
}); 

app.post('/ajouter_question', function(req, res,cb){
    res.send('La question ' + req.body.question + 'a ete entregistree dans la banque de questions.'); 
    var question = new questionTemplate(req.body.subject, req.body.type, req.body.level, req.body.question, req.body.answer); 
    res.send(question); 
});

app.listen(app.get('port'), function() {
    console.log("le serveur ecoute sur %s", app.get('port')); 
});

var question = new questionTemplate("maths", "qcm", "facile", "1+1", "2");
var obj = question.toObj();

console.log(obj);