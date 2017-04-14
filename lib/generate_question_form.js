var questionDB = require('./question_db.js'),
    formBuilder = require('form-builder').Form,
    fs = require('fs');



module.exports = function(formAction, questionType, callback){

    var br = '</br>'
    var htmlForm = '';
    var form = formBuilder.create({enctype: 'application/json', action: formAction, method: 'POST'});

    htmlForm += form.open();

    var subjects = {
        math: 'Math',
        francais: 'Francais',
        anglais: 'Anglais'
    }

    var levels = {
        facile: 'Facile',
        moyen: 'Moyen',
        difficile: 'Difficile'
    }  

    htmlForm += form.open();
    htmlForm += 'Sujet: '
    htmlForm += form.select()
                    .attr({name: 'subject', multiple: false})
                    .setOptions(subjects)
                    .setDefault('Math')
                    .render() + br;
    htmlForm += 'Type: ' + questionType;
    htmlForm += 'Niveau: '
    htmlForm += form.select()
                    .attr({name: 'level', multiple: false})
                    .setOptions(levels)
                    .render() + br;
    htmlForm += 'Question: '
    htmlForm += form.text().attr({name: 'question'}).render() + br;
    htmlForm += 'Reponse: '
    htmlForm += form.text().attr({name: 'answer'}).render() + br;


    htmlForm += form.submit().render() + br;
    htmlForm += form.end();

    callback(htmlForm);
}