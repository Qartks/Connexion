module.exports = function (app) {

    var mongoose = require('mongoose');
    var url = 'mongodb://admin:admin@ds063546.mlab.com:63546/connexion-db';
    mongoose.connect(url, function () {
        console.log("Hi");
    });


};