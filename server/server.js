const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config({ path: "./config.env" });
const socketIo =() => require("socket.io")(5001, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

const flash = require('express-flash');
const session = require('express-session');


const dbo = require("./db/conn");
const passport = require("passport");
const { clearInterval } = require("timers");

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
const server = http.Server(app);
const io = socketIo(server)
app.listen(port, () => {
    
    console.log(`Server is running on port: ${port}`);
});
let interval;
io.on("connection", (socket) => {
    socket.on("AvailableDriver", (string, obj) => {
        io.emit("Ride-Request",string, obj)
    })
    socket.on("disconnect", () => {
        //console.log("Client Disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI", response);
};

//server.listen(port, () => console.log(`Listening on port ${port}`));