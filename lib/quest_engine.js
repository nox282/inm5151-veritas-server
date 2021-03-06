var questionDB = require('./question_db.js');

var quests = [];

function constructQuest(quest){
    var q = {}, n;
    
    for(var key in quest){
        if(key != 'nbQuestion')
            q[key] = quest[key];
        else
            n = quest[key];
    }
    q['questions'] = questionDB.getRandomBySubject(n, q.subject);

    return q;
}


module.exports = {
    add: function(quest){
        quests.push(constructQuest(quest));
    },
    'quests': quests
} 