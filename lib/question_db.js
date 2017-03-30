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

    getRandom: function() {
        var keys = Object.keys(question_db_by_id);
        var randomKey = keys[Math.floor(Math.random() * keys.length)];

        return question_db_by_id[randomKey];
    },

    getRandomBySubject: function(subject) {
        var keys = Object.keys(question_db_by_sub[subject]);
        var randomKey = keys[Math.floor(Math.random() * keys.length)];

        return question_db_by_sub[subject][randomKey];
    }
}