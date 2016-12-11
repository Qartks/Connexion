module.exports = function (app, model) {

    app.post("/api/user/:userId/post",createPost);
    app.get("/api/post/:postId",getPostById);
    app.get("/api/user/:userId/post/",getPostByUserId);
    app.delete("/api/post/:postId",deletePostById);
    app.put("/api/post/:postId",updatePost);
    app.get("/api/openposts", getAllOpenPosts);
    app.put("/api/post/:postId/comment", updateCommentsForPostId);
    app.get("/api/:userId/posts", getPostCreatedByUserId);

    function getPostCreatedByUserId(req, res) {
        var userId = req.params.userId;
        model
            .postModel
            .getPostCreatedByUserId(userId)
            .then(function (posts) {
                res.send(posts)
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateCommentsForPostId(req, res) {
        var postId = req.params.postId;
        var comment = req.body;
        model
            .postModel
            .updateCommentsForPostId(postId, comment)
            .then( function (comment) {
                res.send(comment);
            } , function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function getConversationsByPostId(req, res) {
        var postId = req.params.postId;
        model
            .postModel
            .getConversationsByPostId(postId)
            .then(function (comms) {
                res.send(comms);
            },function (err) {
                res.sendStatus(500).send(err);
            });
    }
    
    function getAllOpenPosts(req, res) {
        model
            .postModel.getAllOpenPosts()
            .then(function (posts) {
                res.send(posts);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createPost(req,res) {
        var post = req.body;
        var userId = req.params.userId;
        model
            .postModel.createPost(post)
            .then(function (newPost) {
                res.send(newPost);
            },function (err) {
                res.sendStatus(500).send(err);
        });
    }
    function getPostById(req,res) {
        var postId = req.params.postId;
        model
            .postModel.getPostById(postId)
            .then(function (postObj) {
                res.send(postObj);
            },function (err) {
                res.sendStatus(500).send(err);
        });
    }
    function getPostByUserId(req,res) {
        var userId = req.params.userId;
        model
            .postModel.getPostByUserId(userId)
            .then(function (postObj) {
                res.send(postObj);
            },function (err) {
                res.sendStatus(500).send(err);
        });
    }
    function deletePostById(req,res) {
        var postId = req.params.postId;
        model
            .postModel.deletePostById(postId)
            .then(function (succ) {
                res.send("OK")
            },function (err) {
                res.sendStatus(500).send(err);
        });
    }
    function updatePost(req, res) {
        var post = req.body;
        var postId = req.params.postId;
        model
            .postModel.updatePost(postId,post)
            .then(function (postObj) {
                res.send(postObj)
            },function (err) {
                res.sendStatus(500).send(err);
        });
    }
};