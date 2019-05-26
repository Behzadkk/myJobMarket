const db = require("../helper/sqlDB").createDB();
const { resHandler } = require("../helper/resHandler");
const { postReqQuery, postValuesHandler } = require("../helper/postReqHandler");
const { putReqHandler } = require("../helper/putReqHandler");
const { getHandler } = require("../helper/getHandler");
const { getById } = require("../helper/getById");

exports.getProjects = (req, res) => {
  // getHandler(res, "projects");
  const sql = `SELECT projects.*, users.email FROM projects JOIN users ON projects.hirer_id=users.userId
  `;
  db.all(sql, [], (err, rows) => {
    resHandler(err, rows);
    res.status(200).json({
      projects: rows
    });
  });
};

exports.getProjectById = (req, res) => {
  const id = req.params.id;
  // getById(res, "projects", id);
  const sql = `SELECT * FROM projects JOIN users ON projects.hirer_id=users.id WHERE projects.projectId = ?`;
  db.all(sql, [id], (err, rows) => {
    resHandler(err, rows);
    res.status(200).json({
      projects: rows
    });
  });
};

exports.searchProjects = (req, res) => {
  const title = req.params.title;
  const sql = `SELECT * FROM projects WHERE title like '%${title}%'`;
  db.all(sql, [], (err, rows) => {
    resHandler(err, rows);
    res.status(200).json({
      projects: rows
    });
  });
};

exports.createProject = function(req, res) {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const safeParams = [
    "title",
    "details",
    "price",
    "deadline",
    "project_length",
    "hirer_id",
    "created_date"
  ];
  const insert = postReqQuery("project", safeParams);
  const insertValues = postValuesHandler(req);
  db.run(insert, { ...insertValues }, function(err, rows) {
    getById(res, "projects", this.lastID);
  });
};

exports.updateProject = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const safeParams = [
    "title",
    "details",
    "price",
    "deadline",
    "project_length"
  ];

  const updatedDetails = putReqHandler(req, safeParams);
  db.run(updatedDetails, [req.params.id], function(err, rows) {
    getById(res, "projects", req.params.id);
  });
};

exports.deleteProject = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const id = req.params.id;
  const sql = `DELETE FROM projects WHERE projectId = ${id}`;
  db.run(sql, [], (err, rows) => {
    resHandler(err, rows);
  });
  res.send(id);
};
