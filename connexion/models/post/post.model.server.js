module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var PostSchema = require('./post.schema.server')();
    var PostModel = mongoose.model("PostModel", PostSchema);
    var api = {
        setModel        : setModel,
        getPostById     : getPostById,
        createPost      : createPost,
        updatePost      : updatePost,
        deletePostById  : deletePostById,
        getPostByUserId : getPostByUserId,
        getAllOpenPosts : getAllOpenPosts
    };
    function setModel(_model) {
        model = _model;
    }
    function getPostById(postId){
        return PostModel.findOne({_id:postId});
    }
    function createPost(post){
        return PostModel.create(post);
    }
    function updatePost(postId,post){
        return PostModel.update({_id:postId}, {$set : post});
    }
    function deletePostById(postId){
        return PostModel.remove({_id:postId});
    }
    function getPostByUserId(userId) {
        return PostModel.find({creatorId : userId});
    }
    function getAllOpenPosts(userId) {
        return PostModel.find({ $or : [ {isOpen : true }, {friends : userId}, {creatorId : userId}]});
    }
    return api;
};