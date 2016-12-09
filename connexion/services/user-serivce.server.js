module.exports = function (app, model) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var userId = req.body.userId;
        var text = req.body.text;
        var imageFile = req.file;

        var originalname  = imageFile.originalname; // file name on user's computer
        var filename      = imageFile.filename;     // new file name in upload folder
        var path          = imageFile.path;         // full path of uploaded file

        var f = '/uploads/' + filename;
        model.userModel.updateImageUrl(userId, f)
            .then( function (user) {
                res.redirect("/index.html#/user/"+userId+"/profile/edit");
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }


    var passport      = require('passport');
    var cookieParser = require('cookie-parser');
    var session      = require('express-session');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy    = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var OAuth= require('oauth').OAuth




    // Need this for twitter don't remove this
    app.get('/*', function(req, res, next) {
        if (req.headers.host.match(/^www\./) != null) {
            res.redirect("http://" + req.headers.host.slice(4) + req.url, 301);
        } else {
            next();
        }
    });


    app.use(session({
        secret: "This is a secret lol",
        resave: true,
        saveUninitialized: true,
        cookie:{ secure: false }
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    // passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



    //CRUD Operations
    app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.get("/api/:userId/users", getAllValidUsers);

    // Login Operations
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.get("/api/loggedin", loggedin);
    app.post("/api/register", register);



// Twitter
    //1. Login
    var twitterConfig = {
        consumerKey: "p4AB7WZ0LseMrT0S1mpK62kIt",
        consumerSecret: "cmYazQQCFJsg1LW6lApQJZHHZnTO9twAKGAosJFkTR0PehKEzS",
        callbackURL: "/auth/twitter/callback"
    };
    var TwitterStrategy = require('passport-twitter').Strategy;

    passport.use(new TwitterStrategy(twitterConfig, twitterFunction));

    function twitterFunction(token, refreshToken, profile, done) {
        model.userModel
            .findUserByTwitterId(profile.id)
            .then(
                function(user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newTwitterUser = {
                            username: profile.username,
                            firstName: profile.displayName,
                            twitter: {
                                id: profile.id,
                                token: token,
                                tokenSecret :refreshToken
                            },
                            profilePicture : profile.photos.length>0 ? profile.photos[0].value : "",
                        };
                        model.userModel.createUser(newTwitterUser)
                            .then(function (user) {
                                return done(null, user);
                            },function (err) {
                                if (err) { return done(err); }
                            })

                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    };

    app.get('/auth/twitter',
        passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter',
            { failureRedirect: '/#/login' }),
        function(req, res) {

            res.redirect('/#/user');
        });

    // sendTweet

    function initTwitterOauth() {
        oa = new OAuth(
            "https://twitter.com/oauth/request_token"
            , "https://twitter.com/oauth/access_token"
            , "p4AB7WZ0LseMrT0S1mpK62kIt"
            , "cmYazQQCFJsg1LW6lApQJZHHZnTO9twAKGAosJFkTR0PehKEzS"
            , "1.0A"
            , "/twitter/authn/callback"
            , "HMAC-SHA1"
        );
    }

    app.post('/twitter/tweet', makeTweet);

    function makeTweet(req, res) {
        var tweetData = req.body;
        var userId = tweetData.userId;
        var message = tweetData.message;
        makeTweetHelper(userId, message, function (error, data) {
            if(error) {
                console.log(require('sys').inspect(error));
                res.send('No twitter handle configured');
            } else {
                console.log(data);
                res.send('OK');
            }
        });
    }

    function makeTweetHelper(userId, message, cb) {
        initTwitterOauth();
        model.userModel.findUserById(userId)
            .then(function (userObj) {
                oa.post(
                    "https://api.twitter.com/1.1/statuses/update.json"
                    , userObj.twitter.token
                    , userObj.twitter.tokenSecret
                    , {"status": message }
                    , cb
                );
            })
    }

// End Of Twitter


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }


    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (err) {
                if (err) {
                    return done(err);
                }
            });
    }



    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function register (req, res) {
        var userReq = req.body;
        userReq.password = bcrypt.hashSync(userReq.password);

        model
            .userModel
            .findUserByUsername(userReq.username)
            .then(
                function (user) {
                    if (user) {
                        res.send("0");
                    } else {
                        model
                            .userModel
                            .createUser(userReq)
                            .then(
                                function(u){
                                    if(u){
                                        req.login(u, function(err) {
                                            if(err) {
                                                res.status(400).send(err);
                                            } else {
                                                res.json(u);
                                            }
                                        });
                                    }
                                }
                            );
                    }
                }
            );
    }


    function createUser(req, res) {
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model.userModel.deleteUser(userId)
            .then(function (user) {
                if (user) {
                    res.sendStatus(200);
                } else {
                    res.send("0");
                }
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function findUser(req, res) {
        var query = req.query;
        if (query.username && query.password) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        } else {
            res.send(req.user);
        }
    }

    function findUserByUsername(req, res) {
        var query = req.query;
        var username = query.username;

        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send("0");
                    }
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var query = req.query;
        var username = query.username;
        var password = query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send("0");
                    }
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send("0");
                    }
                }, function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        model
            .userModel
            .updateUser(userId, user)
            .then(
                function () {
                    res.sendStatus(200);
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function getAllValidUsers(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .getAllValidUsers(userId)
            .then(
                function (users) {
                    res.json(users)
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
};