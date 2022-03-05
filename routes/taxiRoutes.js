const express = require('express');
const dbo = require("../server/db/conn");
const driverRouter = express.Router();

// driverRouter.route('/').get(function(req, res){
//     //Ask permission for user's location as 

// });

// driverRouter.route('/register').post();

driverRouter.route('/login').get(function(req, res){
    
let db_connect = dbo.getDb("myFirstDatabase");
    db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result){
        if (err) throw err;
        res.json(result);
    });
}
);

// driverRouter.route('/Home').get();

// driverRouter.route('/Home/Edit-Profile').get();

module.exports = driverRouter;