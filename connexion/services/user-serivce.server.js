module.exports = function (app, model) {


    var passport      = require('passport');
    var cookieParser = require('cookie-parser');
    var session      = require('express-session');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy    = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;


    // Twitter Login
    var TwitterStrategy = require('passport-twitter').Strategy;
    var twitterConfig = {
        consumerKey: "AxbikkK8La8R62TTS98agCKf3",
        consumerSecret: "GXV8dUUI2SOvjotNIuchAjvaMBRcWVXAwh626NeCQIXyFB7ac8",
        callbackURL: "http://www.example.com/auth/twitter/callback"
    };
    passport.use(new TwitterStrategy(twitterConfig, twitterStrategy));


    app.use(session({
        secret: "This is a secret lol",
        resave: true,
        saveUninitialized: true
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
    app.delete("/api/user", deleteUser);

    // Login Operations
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.get("/api/loggedin", loggedin);
    app.post("/api/register", register);


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

    function twitterStrategy(token, tokenSecret, profile, done) {
        console.log(profile);
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
};