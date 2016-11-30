module.exports = function () {

    var mongoose = require('mongoose');
    var url = 'mongodb://admin:admin@ds063546.mlab.com:63546/connexion-db';
    mongoose.connect(url);

    var userModel = require('./user/user.model.server')();
    var postModel = require('./post/post.model.server')();

    var model = {
        userModel : userModel,
        postModel : postModel
    };

    userModel.setModel(model);
    postModel.setModel(model);

    return model;


};