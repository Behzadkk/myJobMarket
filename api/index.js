const express = require("express");
const router = express.Router();

const filename = "database/database.sqlite";
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(filename);
// db.run("PRAGMA foreign_keys = ON");

const projectController = require("../controllers/projects-controller");
const userController = require("../controllers/user-controller");
const applicationController = require("../controllers/applications-controller");

// projects
router.get("/projects", projectController.getProjects);
router.get("/projects/title/:title", projectController.searchProjects);
router.post("/projects/", projectController.createProject);
router.put("/projects/:id", projectController.updateProject);
router.delete("/projects/:id", projectController.deleteProject);

// users
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.userProfile);
router.post("/users", userController.createUser);

// UPDATE  a user
// DELETE a user

// apply for a project
router.get("/applications", applicationController.getApplications);
router.post("/applications", applicationController.createApplication);
// cancel an application
router.delete("/applications/:id", applicationController.cancelApplication);

module.exports = router;
