var FileReader = require('file-reader'); 

var question_db_by_id = {};
var question_db_by_sub = {};

var ids = 0;

function extractSubject(question){
    var newObj = {}
    for(var key in question){
        if(key != "subject")
            newObj[key] = question[key];
    }
    return newObj;
}

function addToDBId(question, id){
    question_db_by_id[id] = {};

    for(var key in question)
        question_db_by_id[id][key] = question[key];
}

function addToDBSubject(question, subject ,id){
    if(question_db_by_sub[subject] == null)
        question_db_by_sub[subject] = {};

    question_db_by_sub[subject][id] = {};    

    for(var key in question){
        if(key != "subject")
            question_db_by_sub[subject][id][key] = question[key];
    }
}

function getNRandom(questions, n){
    var qs = [];
    var keys = Object.keys(questions);

    for(var i = 0; i < n; i++){
        if(keys.length > 0){
            var randomIndex = Math.floor(Math.random() * keys.length);
            
            var randomKey = keys[randomIndex];
            keys.splice(randomIndex, 1);
            qs.push(questions[randomKey]);
        }
    }

    return qs;
}

module.exports = {
    add: function(question){
        var id = ids++;
        addToDBId(question, id);

        var questionWOSubject = extractSubject(question);
        addToDBSubject(questionWOSubject, question.subject, id);
    },

    get: function(id) {
        return question_db_by_id[id];
    },

    getRandom: function(n) {
        return getNRandom(question_db_by_id, n);
    },

    getRandomBySubject: function(n, subject) {
        return getNRandom(question_db_by_sub[subject], n);
    },

    by_id: function(){
        return question_db_by_id;
    },

    by_sub: function(){
        return question_db_by_sub;
    },

    export: function(callback){
        var db = {};
        db["ids"] = ids;
        db["question_db_by_id"] = question_db_by_id;
        db["question_db_by_sub"] = question_db_by_sub;

        callback(JSON.stringify(db, null, 2));
    },

    'questions': question_db_by_id, 

    //ATTENTION PAS DE VALIDATION ICI
    import: function(input){

        var jsonObj = new FileReader();
        if (input.files && input.files[[0]]) {
            jsonObj.readAsText(input.files[0], "UTF-8");
        }


        var _ids;
        var _question_id;
        var _question_sub;
        try{
            _ids = jsonObj.ids;
            _question_id = jsonObj.question_db_by_id;
            _question_sub = jsonObj.question_db_by_sub;
    
            console.log("importation reussie");
        } catch(err) {
            console.logs("importation echoue : " + err.message);
        }

        ids = _ids;
        question_db_by_id = _question_id;
        question_db_by_sub = _question_sub;
        console.log(question_db_by_id); 
    }, 

    readFile: function(input) {
        if (input.files && input.files[[0]]) {

            var reader = new FileReader();
            
            reader.readAsText(input.files[0], "UTF-8");
            reader.onload = function (evt) {
                return(evt.target.result);
            }
            reader.onerror = function (evt) {
                alert("error reading file");
            }
        }
    }
}