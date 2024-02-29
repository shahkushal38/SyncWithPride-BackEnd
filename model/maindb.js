const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./userSchema")

db.booking = require("./bookingSchema");

module.exports = db;

