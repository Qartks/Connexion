module.exports = function () {

    var mongoose = require('mongoose');

    var connectionString = 'mongodb://localhost/connexion';

    if(process.env.MLAB_PASSWORD) {
        connectionString = 'mongodb://' +
            process.env.MLAB_USERNAME + ':' +
            process.env.MLAB_PASSWORD +
            '@ds013916.mlab.com:13916/web-dev-kartikeya-db';
    }
    mongoose.connect(connectionString);

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