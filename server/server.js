const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;
const dbo = require("./db/conn");

app.use(cors());
app.use(express.json());
app.use(require('../routes/taxiRoutes'));

dbo();
app.listen(port, () => {
    
    console.log(`Server is running on port: ${port}`);
});
