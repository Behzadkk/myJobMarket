const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const filename = "database/database.sqlite";
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(filename);
db.run("PRAGMA foreign_keys = ON");

// GET all projects
router.get("/projects", function(req, res) {
  const sql = "SELECT * FROM projects";
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

// search projects based on title
router.get("/projects/title/:title", function(req, res) {
  const title = req.params.title;

  const sql = `SELECT * FROM projects WHERE title like '%${title}%'`;
  console.log(sql);
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

// POST a new project
router.post("/projects/", function(req, res) {
  const project = req.body;
  // add the relation between project and hirer to use in $hirer.id
  // for now it will use hard coded id = 1
  // it should check if the user id exist
  const insert = `INSERT INTO projects (title, details, price, deadline, project_length, hirer_id, created_date) VALUES ($title, $details, $price, $deadline, $project_length, $hirer_id, $created_date)`;
  db.run(
    insert,
    {
      $title: project.title,
      $details: project.details,
      $price: project.price,
      $deadline: project.deadline,
      $project_length: project.project_length,
      $hirer_id: 1,
      $created_date: new Date().toISOString()
    },
    function(err) {
      if (err) {
        console.log("ERROR fetching from the database:", err);
        return;
      }
      console.log("Request succeeded, new data inserted, id =", this.lastID);
    }
  );
  res.sendStatus(200);
});
// router.post("/projects/", function(req, res) {
//   const project = req.body;
//   const insert = `INSERT INTO projects (title, details, price, deadline, project_length, hirer_id, created_date) VALUES ("${
//     project.title
//   }", "${project.details}" , "${project.price}" , "${project.deadline}", "${
//     project.project_length
//   }", "${project.hirer_id}", "${new Date().toISOString()}") `;
//   db.run(insert, [], (err, rows) => {
//     if (err) {
//       console.log("ERROR fetching from the database:", err);
//       return;
//     }
//     console.log("Request succeeded, new data fetched", rows);
//   });
//   res.sendStatus(200);
// });

// UPDATE a project
router.put("/projects/:id", function(req, res) {
  const id = req.params.id;
  const editingProject = req.body;
  let updatedDetails = "UPDATE projects SET ";
  if (editingProject.title) {
    updatedDetails += ` title = "${editingProject.title}",`;
  }
  if (editingProject.details) {
    updatedDetails += ` details = "${editingProject.details}",`;
  }
  if (editingProject.price) {
    updatedDetails += ` price = ${editingProject.price},`;
  }
  if (editingProject.deadline) {
    updatedDetails += ` deadline = "${editingProject.deadline}",`;
  }
  if (editingProject.project_length) {
    updatedDetails += ` project_length = ${editingProject.project_length},`;
  }
  updatedDetails += ` updated_date = "${new Date().toISOString()}" WHERE id = ?`;
  console.log(updatedDetails);
  db.run(updatedDetails, [id], function(err) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log(`Request succeeded, data of id = ${this.lastID} is updated`);
  });
  res.sendStatus(200);
});

// DELETE a project
router.delete("/projects/:id", function(req, res) {
  const id = req.params.id;
  const sql = `DELETE FROM projects WHERE id = ${id}`;
  db.run(sql, [], err => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, data erased");
    res.sendStatus(200);
  });
});

// CREATE a user
router.post("/users/", function(req, res) {
  let user = {};
  bcrypt
    .hash(req.body.password, 12)
    .then(hashedPassword => {
      user.email = req.body.email;
      user.password = hashedPassword;
      return user;
    })
    .then(user => {
      // I need check if a user exists
      return user;
    })
    .then(user => {
      const insert = `INSERT INTO users (email, password) VALUES ($email, $password)`;
      db.run(
        insert,
        {
          $email: user.email,
          $password: user.password
        },
        function(err) {
          if (err) {
            console.log("ERROR fetching from the database:", err);
            return;
          }
          console.log(
            "Request succeeded, new data inserted, id =",
            this.lastID
          );
        }
      );
    })
    .catch(err => {
      throw err;
    });
  res.sendStatus(200);
});

// GET all users
router.get("/users", function(req, res) {
  const sql = "SELECT * FROM users";
  db.all(sql, [], (err, rows) => {
    rows.forEach(user => (user.password = null));
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      users: rows
    });
  });
});
// UPDATE  a user

// DELETE a user

// a user posts a project
router.post("/users/:id/projects/", function(req, res) {
  const hirer_id = req.params.id;
  const project = req.body;

  // it should check if the user id exist
  // ??
  const insert = `INSERT INTO projects (title, details, price, deadline, project_length, hirer_id, created_date) VALUES ($title, $details, $price, $deadline, $project_length, $hirer_id, $created_date)`;
  db.run(
    insert,
    {
      $title: project.title,
      $details: project.details,
      $price: project.price,
      $deadline: project.deadline,
      $project_length: project.project_length,
      $hirer_id: hirer_id,
      $created_date: new Date().toISOString()
    },
    function(err) {
      if (err) {
        console.log("ERROR fetching from the database:", err);
        return;
      }
      console.log("Request succeeded, new data inserted, id =", this.lastID);
    }
  );
  res.sendStatus(200);
});

// Get a user's all projects
router.get("/users/:id/projects/", function(req, res) {
  const hirer_id = req.params.id;
  const sql = "SELECT * FROM projects WHERE hirer_id =?";
  db.get(sql, [hirer_id], (err, rows) => {
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
module.exports = router;
