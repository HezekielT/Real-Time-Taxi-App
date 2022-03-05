const express = require('express');

const driverRouter = express.Router();

driverRouter.route('/').get(function(req, res){
    //Ask permission for user's location as 
});

driverRouter.route('/register').post();

driverRouter.route('/login').get();

driverRouter.route('/Home').get();

driverRouter.route('/Home/Edit-Profile').get();

