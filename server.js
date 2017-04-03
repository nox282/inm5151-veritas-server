
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    stateHandler = require('./lib/state_handler.js'),
    questionDB = require('./lib/question_db.js'),
    questionForm = require('./lib/question_form.js'),
    queteForm = require('./lib/quest_form.js'),
    questEngine = require('./lib/quest_engine.js'),

    index = "./lib/html/index.html";

var app = express(); 

app.set('port', (process.env.PORT || 5000)); 
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/index', function(req, res, cb){
    var html = fs.readFileSync(index);
    res.writeHeader(200, {"Content-type":"text/html"});
    res.write(html); 
    res.end();

    return cb();  
});

app.post('/update_state', function(req, res, cb){
    stateHandler(req.body, function(data){
        res.send(data);
        return cb();
    });
});


app.get('/get_question_form', function(req, res, cb){
    questionForm('/ajouter_question', function(form){
        res.send(form);
        return cb();
    });
}); 

app.post('/ajouter_question', function(req, res,cb){
    questionDB.add(req.body);
    res.send('OK'); 
});

app.get('/get_quest_form', function(req, res, cb){
    queteForm('/ajouter_quete', function(form){
        res.send(form);
        return cb();
    });
});

app.post('/ajouter_quete', function(req, res, cb){
    questEngine.add(req.body);
    res.send('OK');

    return cb();
});

app.get('/get_quests', function(req, res, cb){
    res.writeHeader(200, {"Content-type":"application/json"});
    res.write(JSON.stringify(questEngine.quests, null, 2));
    res.end;

    return cb();
});

app.post('/importer_db', function(req, res, cb){
    questionDB.import(req.body, function(result){
        res.send(result);
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