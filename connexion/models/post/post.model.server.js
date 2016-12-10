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
        getAllOpenPosts : getAllOpenPosts,
        getConversationsByPostId : getConversationsByPostId,
        updateCommentsForPostId : updateCommentsForPostId
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
        return PostModel.findOneAndUpdate({_id:postId}, {$set : post} , { new: true });
    }
    function deletePostById(postId){
        return PostModel.remove({_id:postId});
    }
    function getPostByUserId(userId) {
        return PostModel.find({creatorId : userId});
    }
    function getAllOpenPosts(userId) {
        return PostModel.find({ $or : [ {isOpen : true } ]});
    }
    function getConversationsByPostId(postId) {
        return PostModel.find({});
    }
    function updateCommentsForPostId( postId, comment) {
        return PostModel
            .findOneAndUpdate (
                {
                    _id :   postId
                },
                {
                    $push: {
                        comments : {
                            userId          : comment.userId,
                            username        : comment.username,
                            profilePicture  : comment.profilePicture,
                            text            : comment.text
                        }
                    }
                },
                {
                    new     :     true
                }
            );
    }
    return api;
};