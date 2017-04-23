var questionDB = require('./question_db.js'),
    formBuilder = require('form-builder').Form;

module.exports = function(formAction){
    var br = '</br>'
    var htmlForm = '';
    var form = formBuilder.create({enctype: 'application/json', action: formAction, method: 'POST'});

    htmlForm += form.open();
    htmlForm += 'Nom '; 
    htmlForm += form.text().attr({name: 'titre', required:'required'}).setDefault('Quete Epic').render() + br;

    var subjects = {};
    for(var sub in questionDB.by_sub()){
        subjects[sub] = sub;
    }

    var levels = {
        facile: 'Facile',
        moyen: 'Moyen',
        difficile: 'Difficile'
    } 

    htmlForm += 'Sujet '; 
    htmlForm += form.select()
                    .attr({name: 'subject', required:'required', multiple: false})
                    .setOptions(subjects)
                    .render() + br;

    htmlForm += 'Niveau '; 
    htmlForm += form.select()
                    .attr({name: 'level', required:'required', multiple: false})
                    .setOptions(levels)
                    .setDefault(levels[0])
                    .render() + br; 

    htmlForm += 'Nombre de questions '; 
    htmlForm += form.text().attr({name: 'nbQuestion', required:'required'}).setDefault('3').render() + br;

    htmlForm += form.submit().render() + br;
    htmlForm += form.end();

    return htmlForm;
}