const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config({ path: "./config.env" });
const socketIo =() => require("socket.io")(5001, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
})

// const flash = require('express-flash');
// const session = require('express-session');


const dbo = require("./db/conn");
// const passport = require("passport");
// const { clearInterval } = require("timers");

app.use(cors());
app.use(express.json());
app.use(require('../routes/taxiRoutes'));
// app.use(flash());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
// }));
// app.use(passport.initialize())
// app.use(passport.session())
dbo();
const server = http.Server(app);
const io = socketIo(server)

// app.listen(port, () => {
    
//     console.log(`Server is running on port: ${port}`);
// });
let interval;
io.on("connection", (socket) => {
    const id = socket.handshake.query.id
    //console.log("soc", id)
    socket.join(id)

    socket.on('send-request', (id, start, end, accepted) => {
        //console.log("wow")
        io.emit('get-request', id, start, end, accepted);
    })

    socket.on('request-accepted',(passengerId, id, driversPhoto, driversName, carsPlateNo) => {
        io.emit('get-myDriver', passengerId, id, driversPhoto, driversName, carsPlateNo);
    })
    //console.log(socket.id)
    // socket.on("AvailableDriver", (string, obj) => {
    //     io.emit("Ride-Request",string, obj)
    // })
    // socket.on("Accept-Request", (txt) => {
    //     io.emit("Accepted", txt)
    // })
    // socket.on("disconnect", () => {
    //     //console.log("Client Disconnected");
    //     clearInterval(interval);
    // });
    // Here is the right one
    // socket.on("send-request", () => {
    //     socket.emit("get-request")
    // })
    // socket.on("request-accepted", () => {
        // socket.broadcast("delete-request-from-the-rest", (passengerId) => {})
        // socket.emit("from-driver"), () => {})
    // })
});


//server.listen(port, () => console.log(`Listening on port ${port}`));