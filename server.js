var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;

var bodyParser = require('body-parser');
var port  = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

require('./connexion/app')(app);

app.listen(port,function(){
    console.log("Running Server on port 3000");
});

