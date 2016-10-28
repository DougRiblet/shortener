var express = require("express");
var path    = require("path");
var validator = require("validator");
require("./db");

var app = express();
var port = process.env.PORT || 8060;

// ENDPOINTS

app.get('/', function (req, res) {
	console.log("=== reaching home")
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/make/:input', function(req, res) {
	console.log("=== reaching make")
	var original = req.params.input;
  if (validator.isURL(original)){
  	var submission = new Link({original:original});
		submission.save(function (err, data) {
  		if (err) {
  			console.log("link create error: ", err);
  		} else {
  			console.log("data returned when creating new link: ", data);
  			res.json({"original":data.original,"shortened":data.shortened});
  		}
		})
  } else {
  	res.json({"original":original,"shortened":"ERROR - not a valid URL"});
  }
});

// SERVER

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
