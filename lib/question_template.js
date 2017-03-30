/*
 * Class to extend when creating a new template question
 */
class question_template {
    constructor (_subject, _type, _level, _question, _answer){ 
        this.subject= _subject;
        this.type= _type;
        this.level= _level;
        this.question= _question;
        this.answer= _answer;
    }

    /*function toObj(){
        return {
            "subject": this.subject,
            "type": this.type,
            "level": this.level,
            "question": this.question,
            "answer": this.answer
        };
    }*/
    //export default question_template; 
    //module.exports = question_template;
}