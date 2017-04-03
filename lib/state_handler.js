module.exports = function(request, callback){
    var jsonString = JSON.stringify(request);
    console.log(jsonString); 
    callback("Other's Data"); 
}