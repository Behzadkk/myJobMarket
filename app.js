const resetDataBase = require("./database/utils/db-tools");
// resetDataBase();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const apiRouter = require("./api");
const isAuth = require("./middleware/isAuth");

const app = express();
// const router = express.Router();

// handle HTTP POST requests
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(isAuth);

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started at port 5000"));
