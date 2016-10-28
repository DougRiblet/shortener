var mongoose = require( 'mongoose' );
var autoIncrement = require("mongodb-autoincrement");

autoIncrement.setDefaults({
	field: "short"
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


mongoose.connection.once('open', function() {

  var linkSchema = mongoose.Schema({
    original: String,
    short: Number
  });
  linkSchema.plugin(autoIncrement.mongoosePlugin);

  // Store song documents in a collection called "songs"
  var Song = mongoose.model('songs', songSchema);
});




// if node process ends, close the connection to mongoose
process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose connection has closed by design.');
    process.exit(0);
  })
})
