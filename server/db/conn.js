const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const Db = process.env.ATLAS_URI;



module.exports = {
    mongoClient : function (){
        const conn = mongoose.createConnection(Db, {
            useNewUrlParser: true
          });
        conn.model('Driver', require('../Schema/driver'));
        //console.log(conn.readyState);
    }
};