const express = require("express");
const router = express.Router();

const filename = "database/database.sqlite";
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(filename);

router.get("/projects", function(req, res) {
    var sql = "SELECT * FROM projects";
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log("ERROR fetching from the database:", err);
        return;
      }
      console.log("Request succeeded, new data fetched", rows);
      res.status(200).json({
        projects: rows
      });
    });
  });