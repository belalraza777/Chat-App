const mongoose = require("mongoose");

const schema = mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    profileImage: {
        public_id: String,
        url: String
    }


}, { timestamps: true });

const User = mongoose.model("User", schema);

module.exports = User;
