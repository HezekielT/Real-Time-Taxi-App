const express = require('express');
const Driver = require("../server/models/driver");
const driverRouter = express.Router();
//const passport = require('passport');
//const initializePassport = require('./config-passport')
// driverRouter.route('/').get(function(req, res){
//     //Ask permission for user's location as 

// });
/** 
 * if you want to use passport-local and session 
 * instead of jwt you can just uncomment this section
 * but since we will be using just jwt module to authenticate and authorize 
 * we don't need it for now.
 *  
 * initializePassport(passport, 
    email => Driver.findOne({ email }),
    id => Driver.findOne({ id })
);
driverRouter.route('/login').post(
    passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect: '/login',
        failureFlash: true,
}));
*/


driverRouter.route('/register').post(async function(req, res) {
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
        res.status(201).send();
        //res.redirect('/login');
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

driverRouter.route('/login').post(async function(req, res) {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(404).json({ message: "Please provide an email and/or a password!" })
    }
    try{
        const user = await Driver.findOne({ email }).select("+password");
        if(!user){
            return res.status(404).json({ message: "No user is found" })
        }
        if(!(await user.matchPassword(password))){
            return res.status(404).json({ message: "Incorrect Password"});
        }
        getToken(user, 200, res);
    } catch(error) {
        res.json({ message: err.message });
    }
})

// driverRouter.route('/').get(function(res) {
//     console.log("Hello Izzy");
// })
// driverRouter.route('/Home').get();

// driverRouter.route('/Home/Edit-Profile').get();

function getToken(user, statusCode, res){
    const token = user.getSignedJwtToken();
    const fname = user.first_name 
    res.status(statusCode).json({successs: true, token, user});
}

module.exports = driverRouter;