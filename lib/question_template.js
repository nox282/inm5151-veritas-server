/*
 * Class to extend when creating a new template question
 */
class question_templates {
    constructor (_subject, _type, _niveau, _question, _answer){
        this.subject: _subject;
        this.type: _type;
        this.niveau: _niveau;
        this.question: _question;
        this.answer: _answer;
    }

    function toObj(){
        return {
            "subject" = this.subject,
            "type" = this.type,
            "niveau" = this.niveau,
            "question" = this.question,
            "answer" = this.answer
        };
    }
}