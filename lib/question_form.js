var questionDB = require('./question_db.js'),
    formBuilder = require('form-builder').Form,
    fs = require('fs');



module.exports = function(formAction){

    var obj = JSON.parse(fs.readFileSync('question_template.json', 'utf8'));
    var i; 
    var types = {}; 
    for(i=0; i<obj.length; i++)
    {
        types[obj[i].type] = obj[i].type; 
    }

    var br = '</br>'
    var htmlForm = '';
    var form = formBuilder.create({enctype: 'application/json', action: formAction, method: 'GET'});

    htmlForm += form.open();

    htmlForm += 'Type: '
    htmlForm += form.select()
                    .attr({name: 'type', multiple: false})
                    .setOptions(types)
                    .render() + br;

    htmlForm += form.submit().render() + br;
    htmlForm += form.end();

    return htmlForm;
}