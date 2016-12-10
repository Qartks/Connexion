module.exports = function () {
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schema({
        twitter : {
            id              : String,
            twitterHandle   : String,
            token           : String,
            tokenSecret     : String
        },
        index: { type : Number},
        firstName       : String,
        lastName        : String,
        username        : String,
        password        : String,
        email           : String,
        phone           : String,
        address         : String,
        tagline         : String,
        headline        : String,
        bio             : String,
        dateCreated: { type : Date, default : Date.now()},
        profilePicture: String,
        friends: [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "user"
            }
        ],
        fblink          : String,
        twtrlink        : String,
        rating          : Number,
        role            : String,
        searchHistory   : [String]
    });
    return userSchema;
};