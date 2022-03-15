const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const Db = process.env.ATLAS_URI;

const connectDB = async () => {
    await mongoose.connect(Db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log("Connected to MongoDB")
};

module.exports = connectDB;