var express = require('express'); 
var bodyParser = require('body-parser'); 
var stateHandler = require('./lib/state_handler.js'); 
var questionTemplate = require('./lib/question_template.js'); 
var questionForm = require('./lib/question_form.js');
var questionDB = require('./lib/question_db.js');

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

app.get('/get_question_form', function(req, res, cb){
    questionForm('/ajouter_question', function(form){
        res.writeHeader(200, {"Content-type":"text/html"});
        res.write(form);
        res.end;

        return cb();
    });
}); 

app.post('/ajouter_question', function(req, res,cb){
    var question = new questionTemplate(req.body.subject, req.body.type, req.body.level, req.body.question, req.body.answer);
    var obj = question.toObj();
    res.send(obj); 
});

app.post('/importer_db', function(req, res, cb){
    questionDB.import(req.body, function(result){
        res.writeHeader(200, {"Content-type":"text/html"});
        res.write(result);
        res.end;

        return cb();
    });
});

app.get('/exporter_db', function(req, res, cb){
    questionDB.export(function(db){
        res.writeHeader(200, {"Content-type":"application/json"});
        res.write(db);
        res.end;

        return cb();
    });
});

app.listen(app.get('port'), function() {
    console.log("le serveur ecoute sur %s", app.get('port')); 
});


for(var i = 0; i < 10; i++){
    var question = new questionTemplate("maths", "qcm", "facile", "1+1", "2");
    questionDB.add(question.toObj());
}
