const db = require("../helper/sqlDB").createDB();
const resHandler = require("../helper/resHandler").resHandler;

exports.getProjects = (req, res) => {
  const sql = "SELECT * FROM projects";
  db.all(sql, [], (err, rows) => {
    resHandler(err, rows);
    res.status(200).json({
      project: rows
    });
  });
};

exports.searchProjects = (req, res) => {
  const title = req.params.title;
  const sql = `SELECT * FROM projects WHERE title like '%${title}%'`;
  console.log(sql);
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

  const project = req.body;
  const insertValues = Object.keys(project).reduce((acc, prop) => {
    acc[`$${prop}`] = project[prop];
    return acc;
  }, {});
  let insert = `INSERT INTO projects (${safeParams.join(", ")})`;
  insert += `VALUES (${safeParams.map(param => `$${param}`).join(", ")})`;
  db.run(
    insert,
    { ...insertValues, $created_date: new Date().toISOString() },
    (err, rows) => {
      resHandler(err, rows);
    }
  );
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

  const id = req.params.id;
  const editingProject = req.body;
  let updatedDetails = "UPDATE projects SET ";
  safeParams.forEach(par => {
    if (editingProject[par]) {
      updatedDetails += ` ${par} = "${editingProject[par]}",`;
    }
  });
  updatedDetails += ` updated_date = "${new Date().toISOString()}" WHERE id = ?`;
  db.run(updatedDetails, [id], (err, rows) => {
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
