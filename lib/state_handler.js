module.exports = function(request, callback){
    var jsonString = JSON.stringify(request.body);
    console.log(jsonString); 
    callback("hello"); 
}