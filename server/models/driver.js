const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const CarSchema = new mongoose.Schema({
    model:{
        type: String,
        required: [true]
    },
    plate_number: {
        type: String,
        required: [true]
    },
    insurance_company: {
        type: String,
    }
});

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const DriversSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Your Name Please!"]
    },
    last_name: {
        type: String,
        required: [true, "Your Father's Name Please"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email address!"],
        unique: false,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: {
        type: Date,
        default: Date.now,
        expires: 86400,
    },
    drivers_photo: {
        data: Buffer,
        contentType: String,
        required: [true, "Please upload your photo"]
    },
    drivers_licence_no: {
        type: String,
        required: [true, "Your driver licence"]
    },
    drivers_current_location: {
        type: pointSchema,
        required: true
    },
    drivers_rating: [Number],
    car: [CarSchema],
});

DriversSchema.pre('save', async function(done) {
    if (!this.isModified("password")) {
        done();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    done();
});

DriversSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

DriversSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });
};

DriversSchema.methods.getResetPasswordToken = function () {
    let resetToken = crypto.randomBytes(32).toString("hex");

    this.resetPasswordToken = await bcrypt.hash(resetToken, Number(10));
    return resetToken;
}


module.exports = mongoose.model('Driver', DriversSchema);