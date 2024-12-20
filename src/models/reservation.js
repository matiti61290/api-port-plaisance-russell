const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber: {
        type: Number,
        ref: 'Catway',
        required: true
    },
    clientName: {
        type: String,
        trim: true,
        required: true
    },
    boatName: {
        type: String,
        trim: true,
        required: true
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date
    }
})
module.exports = mongoose.model('Reservation', Reservation)