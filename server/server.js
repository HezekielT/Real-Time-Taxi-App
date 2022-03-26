const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const flash = require('express-flash');
const session = require('express-session');

const port = process.env.PORT || 5000;
const dbo = require("./db/conn");
const passport = require("passport");

app.use(cors());
app.use(express.json());
app.use(require('../routes/taxiRoutes'));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())
dbo();
app.listen(port, () => {
    
    console.log(`Server is running on port: ${port}`);
});
