var express = require("express");
var path    = require("path");

var app = express();
var port = process.env.PORT || 8060;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/make/:input', function(req, res) {

});




app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});