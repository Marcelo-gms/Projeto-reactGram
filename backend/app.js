require("dotenv").config()

const express = require("express");
const path = require('path');
const cors = require('cors');
const { urlencoded } = require("express");
 
const port = process.env.PORT || 5000;
  
const app = express()

app.use(express.json())

app.use(urlencoded({extended: false}));

//Cors
app.use(cors({credentials:true, origin: "http://localhost:3000"}))

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads" )))

// Db connection

require("./config/db.js")

// Routes
const router = require('./routes/Router.js')

app.use(router)

app.listen(port, () => {
  console.log(`Connectado ao servidor na porta : ${port}!`);
})
