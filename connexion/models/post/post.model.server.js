module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var PostSchema = require('./post.schema.server')();
    var PostModel = mongoose.model("PostModel", PostSchema);
    var api = {
        setModel        : setModel,
        getPostById     : getPostById,
        createNewPost   : createNewPost,
        updatePost      : updatePost,
        deletePostById  : deletePostById
    };
    function setModel(_model) {
        model = _model;
    }
    function getPostById(postId){
        return PostModel.findOne({_id:postId});
    }
    function createNewPost(post){
        return PostModel.create(post);
    }
    function updatePost(postId,post){
        return PostModel.update({_id:postId},post)
    }
    function deletePostById(postId){
        return PostModel.remove({_id:postId});
    }
    return api;
};