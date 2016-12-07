module.exports = function (app, models) {
    app.post("/api/user/:userId/post",createPost);
    app.get("/api/post/:postId",getPostById);
    app.get("/api/user/:userId/post/",getPostByUserId);
    app.delete("/api/post/:postId",deletePostById);
    app.put("/api/post/:postId",updatePost);
    app.get("/api/:userId/allposts", getAllOpenPosts);

    (function () {models.postModel.setModel(models);})();

    function getAllOpenPosts(req, res) {
        var userId = req.params.userId;
        models.postModel.getAllOpenPosts(userId)
            .then(function (posts) {
                res.send(posts);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createPost(req,res) {
        var post = req.body;
        var userId = req.params.userId;
        models.postModel.createPost(post)
            .then(function (newPost) {
                res.send(newPost);
            },function (err) {
                res.sendStatus(500).send(err);
        });
    }
    function getPostById(req,res) {
        var postId = req.params.postId;
        models.postModel.getPostById(postId)
            .then(function (postObj) {
                res.send(postObj);
            },function (err) {
                res.sendStatus(500).send(err);
        });
    }
    function getPostByUserId(req,res) {
        var userId = req.params.userId;
        models.postModel.getPostByUserId(userId)
            .then(function (postObj) {
                res.send(postObj);
            },function (err) {
                res.sendStatus(500).send(err);
        });
    }
    function deletePostById(req,res) {
        var postId = req.params.postId;
        models.postModel.deletePostById(postId)
            .then(function (succ) {
                res.send("OK")
            },function (err) {
                res.sendStatus(500).send(err);
        });
    }
    function updatePost(req, res) {
        var post = req.body;
        var postId = req.params.postId;
        models.postModel.updatePost(postId,post)
            .then(function (postObj) {
                res.send(postObj)
            },function (err) {
                res.sendStatus(500).send(err);
        });
    }
};