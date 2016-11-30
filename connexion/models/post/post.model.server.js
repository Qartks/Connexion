module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var PostSchema = require('./post.schema.server')();
    var PostModel = mongoose.model("PostModel", PostSchema);

    var api = {
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

}