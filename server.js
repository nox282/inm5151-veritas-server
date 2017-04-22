
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    stateHandler = require('./lib/state_handler.js'),
    questionDB = require('./lib/question_db.js'),
    generateForm = require('./lib/generate_question_form.js'),
    questionForm = require('./lib/question_form.js'),
    queteForm = require('./lib/quest_form.js'),
    questEngine = require('./lib/quest_engine.js'),
    index = "./lib/html/index.html" 
    //template = require('jade').compileFile(__dirname + '/lib/html/index.jade'); 


var app = express(); 

app.set('port', (process.env.PORT || 5000)); 
app.set('view engine', 'jade'); 
app.use(express.static(__dirname + '/public'));
app.use("/stylesheets",express.static(__dirname + "/stylesheets"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/index', function(req, res, cb){
    var html = fs.readFileSync(index);
    res.writeHeader(200, {"Content-type":"text/html"});
    res.write(html); 
    res.end();

    return cb();  
});

app.get('/readingjson', function(req, res, cb){
    var obj = JSON.parse(fs.readFileSync('question_template.json', 'utf8'));
    res.writeHeader(200, {"Content-type":"application/json"});
    res.write(obj); 
    res.end();

    return cb();  
});

app.post('/update_state', function(req, res, cb){
    stateHandler(req.body, function(data){
        res.send(data);
        return cb();
    });
});

app.get('/main', function(req, res, cb){
    res.render((__dirname + '/lib/html/index.jade'), {
        question_form: questionForm('/generate_question_form'), 
        quest_form: queteForm('/add_quete')
    });
}); 


app.get('/get_question_form', function(req, res, cb){
    res.render((__dirname + '/lib/html/index.jade'), {
        question_form: questionForm('/generate_question_form'), 
        //question_db: questionDB.by_id
    });
}); 

app.get('/generate_question_form', function(req, res, cb){
    res.render((__dirname + '/lib/html/index.jade'), {
        gen_question_form: generateForm('/add_question', req.query.type), 
        quest_form: queteForm('/add_quete')
    });
});

app.post('/add_question', function(req, res,cb){
    questionDB.add(req.body);
    res.render((__dirname + '/lib/html/index.jade'), {
        question_form: questionForm('/generate_question_form')
    });
});

app.get('/get_quest_form', function(req, res, cb){
    
    res.render((__dirname + '/lib/html/index.jade'), {
        quest_form: queteForm('/add_quete')
    });
});

app.post('/add_quete', function(req, res, cb){
    questEngine.add(req.body);
    res.redirect('/index');
});

app.get('/get_quests', function(req, res, cb){
    res.writeHeader(200, {"Content-type":"application/json"});
    res.write(JSON.stringify(questEngine.quests, null, 2));
    res.end();

    return cb();
});

app.post('/import_db', function(req, res, cb){
    questionDB.import(req.body, function(result){
        res.send(result);
        return cb();
    });
});

app.get('/export_db', function(req, res, cb){
    questionDB.export(function(db){
        res.writeHeader(200, {"Content-type":"application/json"});
        res.write(db);
        res.end();

        return cb();
    });
});

app.listen(app.get('port'), function() {
    console.log("le serveur ecoute sur %s", app.get('port')); 
});