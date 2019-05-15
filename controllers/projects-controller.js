const db = require("../helper/sqlDB").createDB();
const resHandler = require("../helper/resHandler");
const postReqHandler = require("../helper/postReqHandler");
const putReqHandler = require("../helper/putReqHandler");
const getHandler = require("../helper/getHandler");
const getById = require("../helper/getById").getById;

exports.getProjects = (req, res) => {
  getHandler.getHandler(res, "projects");
};

exports.getProjectById = (req, res) => {
  const id = req.params.id;
  getById(res, "projects", id);
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

exports.createProject = (req, res) => {
  const safeParams = [
    "title",
    "details",
    "price",
    "deadline",
    "project_length",
    "hirer_id",
    "created_date"
  ];
  const insert = postReqHandler.postReqQuery("project", safeParams);
  const insertValues = postReqHandler.postValuesHandler(req);
  db.run(insert, { ...insertValues }, (err, rows) => {
    resHandler(err, rows);
  });
  res.sendStatus(200);
};

exports.updateProject = (req, res) => {
  const safeParams = [
    "title",
    "details",
    "price",
    "deadline",
    "project_length"
  ];

  const updatedDetails = putReqHandler.updateStatement(req, safeParams);
  db.run(updatedDetails, [req.params.id], (err, rows) => {
    resHandler(err, rows);
  });
  res.sendStatus(200);
};

exports.deleteProject = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM projects WHERE id = ${id}`;
  db.run(sql, [], (err, rows) => {
    resHandler(err, rows);
  });
  res.sendStatus(200);
};
