const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
         type: String,
         required: true,
         minlength: [3]
        },
    email: {type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@gmail\.com$/, 'Please use a valid @gmail.com address']
        },
    password: {
        type: String,
        required: [true],
    },
    otp: { type: String },
    otpExpiry: { type: Date},
    type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);