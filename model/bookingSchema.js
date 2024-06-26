const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    username: {
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
    },
    date:{
        type: Date,
        required:true
    },
    slot:{
        type: String,
        required: true
    },
    deskNo:
    {
        type: String,
        required: true
    }
})

const Booking = mongoose.model('BOOKING', bookingSchema);
module.exports  = Booking;
