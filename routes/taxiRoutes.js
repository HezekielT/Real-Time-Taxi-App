const express = require('express');
const Driver = require("../server/models/driver");
const driverRouter = express.Router();
const passport = require('passport');
const initializePassport = require('./config-passport')
// driverRouter.route('/').get(function(req, res){
//     //Ask permission for user's location as 

// });


initializePassport(passport, 
    email => Driver.findOne({ email }),
    id => Driver.findOne({ id })
);

driverRouter.route('/register').post(async function(req, res, next) {
    const { first_name, last_name, drivers_licence_no, drivers_photo,
         email, phoneno, password, model, plate_number, insurance_company } = req.body;
    try{
        await Driver.create({
            first_name,
            last_name,
            email,
            phoneno,
            password,
            drivers_photo,
            drivers_licence_no,
            car:{
                model,
                plate_number,
                insurance_company,
            }
        });
        console.log("Success");
        res.statusCode(201).send();
    } catch(err) {
        console.log(err);
    }
});

driverRouter.route('/login').post(
    passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect: '/login',
        failureFlash: true,
}));

// driverRouter.route('/Home').get();

// driverRouter.route('/Home/Edit-Profile').get();

module.exports = driverRouter;