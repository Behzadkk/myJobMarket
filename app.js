const resetDataBase = require("./database/utils/db-tools");
// resetDataBase();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const apiRouter = require("./api");

const app = express();
// const router = express.Router();

// handle HTTP POST requests
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api", apiRouter);

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started at port 5000"));
