
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    stateHandler = require('./lib/state_handler.js'),
    questionDB = require('./lib/question_db.js'),
    generateForm = require('./lib/generate_question_form.js'),
    questionForm = require('./lib/question_form.js'),
    queteForm = require('./lib/quest_form.js'),
    questEngine = require('./lib/quest_engine.js'),
    socketPORT = 5001,
    serverPORT = 5000; 
    index = "./lib/html/index.html", 
    fileUpload = require('express-fileupload')

var app = express();

app.set('port', (process.env.PORT || serverPORT)); 
app.set('view engine', 'jade'); 
app.use(express.static(__dirname + '/public'));
app.use("/stylesheets",express.static(__dirname + "/stylesheets"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

<<<<<<< HEAD
//SOCKET.IO #######################################################
var io = require('socket.io')({
    transports: ['websocket']
});

io.listen(socketPORT);
console.log('Server socket listens on %', socketPORT);

io.on("connection", function(socket){
    socket.on("Move", function(pos){
        io.emit("Dispatch", pos);
    });
});



//EXPRESS #########################################################

app.use("/TemplateData",express.static(__dirname + "/TemplateData"));
app.use("/Release",express.static(__dirname + "/Release"));

app.use(fileUpload());

app.get('/', function(req, res, cb){
    res.redirect('/index')
    return cb();  
});

app.get('/main', function(req, res, cb){
    res.redirect('/index')
    return cb();  
});

app.post('/update_state', function(req, res, cb){
    stateHandler(req.body, function(data){
        res.send(data);
        return cb();
    });
});

app.get('/index', function(req, res, cb){
    res.render((__dirname + '/lib/html/index.jade'), {
        question_form: questionForm('/generate_question_form'), 
        quest_form: queteForm('/add_quete'), 
        question_db: JSON.stringify(questionDB.questions(), null, 2), 
        quest_db: JSON.stringify(questEngine.quests(), null, 2)
    });
}); 

app.get('/generate_question_form', function(req, res, cb){
    res.render((__dirname + '/lib/html/index.jade'), {
        gen_question_form: generateForm('/add_question', req.query.type),
        quest_form: queteForm('/add_quete'), 
        question_db: JSON.stringify(questionDB.questions, null, 2), 
        quest_db: JSON.stringify(questEngine.quests, null, 2)
    });
});

app.post('/add_question', function(req, res,cb){
    questionDB.add(req.body);
    res.redirect('/index');
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

app.get('/get_questions', function(req, res, cb){
    res.writeHeader(200, {"Content-type":"application/json"});
    res.write(JSON.stringify(questionDB.questions, null, 2));
    res.end();

    return cb();
});

app.post('/import_db', function(req, res, cb){
    fs.readFile(req.files.loaded_db.name, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      questionDB.import(JSON.parse(data)); 
      res.redirect('/index');
    });
    
});

app.get('/game', function(req, res, cb){
    res.render((__dirname + '/lib/html/game.jade'));
});

app.get('/statistics', function(req, res, cb){
    res.render((__dirname + '/lib/html/statistics.jade'));
});

app.listen(app.get('port'), function() {
    console.log("le serveur ecoute sur %s", app.get('port')); 
});