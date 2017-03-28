var question_db_by_id = {};
var question_db_by_sub = {};

module.exports = {
    add = function(question){
        question_db_by_id[question.id] = {
            "subject" = question.subject,
            "type" = question.type,
            "niveau" = question.niveau,
            "question" = question.question,
            "answer" = question.answer
        };

        question_db_by_sub[question.subject] = {};
        question_db_by_sub[question.subject][question.id] = {
            "type" = question.type,
            "niveau" = question.niveau,
            "question" = question.question,
            "answer" = question.answer
        };
    },

    get = function(id) {
        return question_db_by_id[id];
    },

    getRandom = function() {
        var keys = Object.keys(question_db_by_id);
        var randomKey = keys[Math.floor(Math.random() * keys.length)];

        return question_db_by_id[randomKey];
    },

    getRandomBySubject = function(subject) {
        var keys = Object.keys(question_db_by_sub[subject]);
        var randomKey = keys[Math.floor(Math.random() * keys.length)];

        return question_db_by_sub[subject][randomKey];
    }
}