/*
 * Class to extend when creating a new template question
 */
module.exports = Question_Template;

function Question_Template(_subject, _type, _level, _question, _answer) {
    this.subject = _subject;
    this.type = _type;
    this.level = _level;
    this.question = _question;
    this.answer = _answer;

    this.toObj = function() {
        return {
            "subject": this.subject,
            "type": this.type,
            "level": this.level,
            "question": this.question,
            "answer": this.answer
        };
    };
};