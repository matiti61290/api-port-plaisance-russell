const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Creation User model
const User = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'le nom est requis']
    },
    firstname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, "l'email est requis"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

User.pre('save', function(next) {
    if(this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);

    next();
});

module.exports = mongoose.model('User', User);