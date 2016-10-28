var express = require("express");
var path    = require("path");
var validator = require('validator');

var app = express();
var port = process.env.PORT || 8060;



app.get('/', function (req, res) {
	console.log("=== reaching home")
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/make/:input', function(req, res) {
	console.log("=== reaching make3")
	var original = req.params.input;
	var code = "0001";
	var output;

  if (validator.isURL(original)){
  	output = "https://szurl.herokuapp.com/" + code;
  } else {
  	output = "Not a valid URL";
  }

	res.json({"original":original,"shortened":output});

});




app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});