const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type: Number,
        trim: false,
        unique: true,
        required: [true, 'Le numero de la catway est requis']
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    catwayState: {
        type: String,
        trim: true,
        required: [true, "Indiquer l'etat de la catway"]
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Catway', Catway);