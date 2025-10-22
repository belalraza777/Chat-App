const mongoose = require("mongoose");

const schema = mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    profileImage: {
        url: String,
        filename: String,
    }


}, { timestamps: true });

const User = mongoose.model("User", schema);

module.exports = User;
