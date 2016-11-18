//Server Dependecies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//Require Schemas
var Article = require('./server/model.js');

//Create Instance of Express
var app = express();
var PORT = process.env.Port || 3000; //Sets an initial port. 

//Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('/public'));

//------------------------------------------------

//MongoDb Configuration 
mongoose.connect('mongodb:');
var db = mongoose.connect;

db.on('error', function(err) {
	console.log('Mongoose Error: ', err);
});

db.on('open', function(){
	console.log('Mongoose connection succesful.');
});

//------------------------------------------------

//Main Route
app.get('/', function(req, res){
	res.sendFile('.public/index.html');

})

app.get('/api/saved', function(req, res){

	Article.find({})
		.exec(function(err, doc){

			if(err){
				console.log(err);
			}else{
				res.send(doc);
			}
		})
});

//Route to add an article to saved list
app.post('/api/saved', function(req,res){
		var newArticle = new Article(req.body);

		console.log(req.body)

		var title = req.body.title;
		var date = req.body.date;
		var url = req.body.url;

		newArticle.dave(function(err, doc){
			if(err){
				console.log(err);
			}else{
				res.send(doc._id);
			}
		});
});

//Route to delete an Article from saved list
app.delete('/api/saved', function(req, res){

		var url = res.param(url);
		Article.find({'url': url}).remove().exec(function(err, data){
				if(err){
					console.log(err);
				}else {
					res.send('DELETED');
				}

		});
});

//------------------------------------------------
app.listen(PORT, function(){
	console.log('App listening on PORT: ' + PORT);
});


