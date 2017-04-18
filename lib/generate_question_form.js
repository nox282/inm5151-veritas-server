var questionDB = require('./question_db.js'),
    formBuilder = require('form-builder').Form,
    fs = require('fs');



module.exports = function(formAction, questionType, callback){

    var obj = JSON.parse(fs.readFileSync('question_template.json', 'utf8'));
    var i; 
    var toGenerate = {}; 
    for(i=0; i<obj.length; i++)
    {
        if(obj[i].type == questionType) {
            toGenerate = obj[i]; 
        }
    }

    var br = '</br>'
    var htmlForm = '';
    var form = formBuilder.create({enctype: 'application/json', action: formAction, method: 'POST'});

    
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
    htmlForm += 'Type: ' + questionType + br;

    for (var property in toGenerate) {
        if (toGenerate.hasOwnProperty(property) && property!='type') {

            htmlForm += toGenerate[property] +' '; 

            if(property == 'subject') {
                htmlForm += form.select()
                                .attr({name: property, multiple: false})
                                .setOptions(subjects)
                                .setDefault(subjects[0])
                                .render() + br;  
            } else if(property == 'level') {
                htmlForm += form.select()
                                .attr({name: property, multiple: false})
                                .setOptions(levels)
                                .setDefault(levels[0])
                                .render() + br; 
            } else {
                if(questionType == 'Reponse a developpement') {
                    htmlForm += form.textarea().attr({name: property, rows: 6}).render() + br;  
                } else {
                    htmlForm += form.text().attr({name: property}).render() + br; 
                }
            }
        }
    }

    htmlForm += form.submit().render() + br;
    htmlForm += form.end();

    callback(htmlForm);
}