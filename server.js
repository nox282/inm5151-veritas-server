var express = require('express'); 
var server = express(); 

server.set('port', (process.env.PORT || 5000)); 
server.use(express.static(__dirname + 'public'));

server.get('/index', function(req, res, cb) {
    res.writeHeader(200, {"context-type":"text/html"});
    res.write("hello world");
    res.end; 

    return cb(); 
});

server.listen(server.get('port'), function() {
    console.log("le serveur ecoute sur %s", server.get('port')); 
});