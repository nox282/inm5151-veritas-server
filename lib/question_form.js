var questionDB = require('./question_db.js'),
    formBuilder = require('form-builder').Form;

module.exports = function(formAction, callback){
    var br = '</br>'
    var htmlForm = '';
    var form = formBuilder.create({enctype: 'application/json', action: formAction, method: 'POST'});

    var subjects = {
        math: 'Math',
        francais: 'Francais',
        anglais: 'Anglais'
    }

    var types = {
        courte: 'Reponse courte', 
        qcm: 'QCM',
        longue: 'Developpement'
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
    htmlForm += 'Type: '
    htmlForm += form.select()
                    .attr({name: 'type', multiple: false})
                    .setOptions(types)
                    .render() + br;
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