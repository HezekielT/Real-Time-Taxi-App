const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const dbo = require("./db/conn");

// const driverList =[{
//     first_name: 'abebe',
//     last_name: 'lema',
//     email: 'abebeLema@gmail.com',
//     password: 'abeebalema',
    
// }]

app.listen(port, () => {
    dbo.mongoClient();
    console.log(`Server is running on port: ${port}`);
});

