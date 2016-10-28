var mongoose = require( 'mongoose' );
var autoIncrement = require("mongodb-autoincrement");

autoIncrement.setDefaults({
	field: "shortened"
});

if(!process.env.URI){
  var uri = require( './uri' ).uri;
} else {
  var uri = process.env.URI;
}

mongoose.connect(uri);

// Connection Events
mongoose.connection.on('connected', function(){
  console.log('Mongoose db connection established with uri:' + uri + "===");
})

mongoose.connection.on('error', function(err){
  console.error('Error with mongoose db connection: ' + err + "===");
})

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose db has been disconnected.');
})

// Set up schema and collection
var linkSchema = mongoose.Schema({
  original: String,
  shortened: Number
});

linkSchema.plugin(autoIncrement.mongoosePlugin);

var Link = mongoose.model('Link', linkSchema);

// if node process ends, close the connection to mongoose
process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose connection has closed by design.');
    process.exit(0);
  })
})
