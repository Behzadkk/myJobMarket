const resetDataBase = require('./database/utils/db-tools');
resetDataBase();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res, next) =>{
    res.send("Hello World!")
})
app.listen(3000, () =>console.log("Server started at port 3000"))