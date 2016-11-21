module.exports = function () {
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schema({
        index: { type : Number},
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        dob : String,
        email: String,
        phone: String,
        address: String,
        bio: String,
        dateCreated: { type : Date, default : Date.now()},
        profilePicture: { type : String },
        friends: [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "user"
            }
        ],
        rating: Number,
        searchHistory: [String]
    });


    return userSchema;
};