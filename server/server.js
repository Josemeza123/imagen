const express = require("express");
const router = require("./routes/routes");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const cors = require("cors");
const path=require('path')

const app = express();

app.use(
  myconn(mysql, {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "images",
  })
);

app.use(express.json())

app.use(cors());
app.use(express.static(path.join(__dirname,'dbimages')))

app.use(router);

app.listen(9000, () => {
  console.log("server running");
});
