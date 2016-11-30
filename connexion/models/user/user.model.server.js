module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        createUser: createUser,
        deleteUser: deleteUser,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        return UserModel.create(user);
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


}