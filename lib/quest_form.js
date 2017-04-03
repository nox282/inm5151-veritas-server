var questionDB = require('./question_db.js'),
    formBuilder = require('form-builder').Form;

module.exports = function(formAction, callback){
    var br = '</br>'
    var htmlForm = '';
    var form = formBuilder.create({enctype: 'application/json', action: formAction, method: 'POST'});

    htmlForm += form.open();
    htmlForm += form.text().attr({name: 'titre'}).setDefault('Quete Epic').render() + br;

    var subjects = {};
    for(var sub in questionDB.by_sub()){
        subjects[sub] = sub;
    }

    htmlForm += form.select()
                    .attr({name: 'subject', multiple: false})
                    .setOptions(subjects)
                    .render() + br;

    htmlForm += form.select()
                    .attr({name: 'level', multiple: true})
                    .setOptions({
                        easy: 'facile',
                        medium: 'moyen',
                        hard: 'difficile'
                    })
                    .render() + br;
    htmlForm += form.text().attr({name: 'nbQuestion'}).setDefault('3').render() + br;

    htmlForm += form.submit().render() + br;
    htmlForm += form.end();

    callback(htmlForm);
}