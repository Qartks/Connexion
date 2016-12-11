module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        findUserById : findUserById,
        updateUser : updateUser,
        createUser: createUser,
        deleteUser: deleteUser,
        setModel: setModel,
        updateImageUrl : updateImageUrl,
        getAllValidUsers : getAllValidUsers,
        findUserByTwitterId :findUserByTwitterId
    };

    return api;


    function setModel(_model) {
        model = _model;
    }

    function getAllValidUsers() {
        return UserModel.find({ role : null });
    }

    function updateImageUrl(userId, f) {
        return UserModel.findOneAndUpdate({_id : userId}, { profilePicture: f }, {$new : true} );
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findOne({_id : userId});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username : username});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({username : username, password: password});
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }
    
    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, {$set : user});
    }
    function findUserByTwitterId(twitterId) {
        return UserModel.findOne({"twitter.id":twitterId});
    }

}