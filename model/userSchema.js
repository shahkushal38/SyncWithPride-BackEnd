const mongoose = require("mongoose");

//user schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    }
})


const Users = mongoose.model('USERS', userSchema);
module.exports  = Users;

