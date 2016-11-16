var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://admin:admin@ds063546.mlab.com:63546/connexion-db';
var bodyParser = require('body-parser');
var port  = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.listen(port,function(){
    console.log("Running Server on port 3000");
});

