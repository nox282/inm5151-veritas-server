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

    console.log(toGenerate.subject); 

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
        if (toGenerate.hasOwnProperty(property)) {
            htmlForm += toGenerate.property; 
            console.log(htmlForm); 
        }
    }

    htmlForm += 'Sujet: '
    htmlForm += form.select()
                    .attr({name: 'subject', multiple: false})
                    .setOptions(subjects)
                    .setDefault('Math')
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