const express = require('express');
const Driver = require("../server/models/driver");
const driverRouter = express.Router();

// driverRouter.route('/').get(function(req, res){
//     //Ask permission for user's location as 

// });

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
    } catch(err) {
        console.log(err);
    }
});

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