//set required modules
var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
var pg=require('pg');

//set up connectionString for the db
var connectionString='postgres://localhost:5432/animals';

// set static public folder
app.use( express.static('public'));

// Start up the server
var server = app.listen( 3000, 'localhost', function( req, res ){
  console.log( "server listening on " + server.address().port);
});

// set up base url
app.get( '/', function( req, res ){
  console.log( 'welcome to the zoo' );
  res.sendFile( path.resolve( 'views/index.html' ) );
  //start the array to house animals

}); // end base url

//POST for submitting animalSub
app.post('/submitAnimals',urlencodedParser, function(req,res){
  var results =[];
  pg.connect( connectionString, function(err, client, done){
    console.log(req.body.quantity + " " + req.body.type);
    client.query('INSERT INTO animals ( animal_type, animal_quantity ) VALUES ( $1, $2)',[req.body.type, req.body.quantity]);
    var query = client.query( 'SELECT * FROM animals ORDER BY id DESC;' );
    console.log( "query: " + query );
    // push each row in query into our results array
    var rows = 0;
    query.on( 'row', function ( row ){
      results.push( row );
    }); // end query push
    query.on( 'end', function (){
      console.log(results);
      return res.json( results );
    });
  });//end pgconnect
});
//post for get animals on load
app.post('/getAnimals',urlencodedParser, function(req,res){
  var results =[];
  pg.connect( connectionString, function(err, client, done){
    var query = client.query( 'SELECT * FROM animals ORDER BY id DESC;' );
    console.log( "query: " + query );
    // push each row in query into our results array
    var rows = 0;
    query.on( 'row', function ( row ){
      results.push( row );
    }); // end query push
    query.on( 'end', function (){
      console.log(results);
      return res.json( results );
    });
  });//end pgconnect
});
