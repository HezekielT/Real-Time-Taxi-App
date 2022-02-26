const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    model:{
        type: String,
        required: [true]
    },
    plate_number: {
        type: String,
        required: [true]
    },
    insurance: {
        type: String,
        required: [true]
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
    photo: {
        data: Buffer,
        contentType: String,
        required: [true, "Please upload your photo"]
    },
    drivers_licence_no: {
        type: String,
        required: [true, "Your driver licence"]
    },
    car: [CarSchema],
});

module.exports = DriversSchema;