const db = require("../helper/sqlDB").createDB();
const { resHandler } = require("../helper/resHandler");
const { getById } = require("../helper/getById");

exports.getApplications = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const sql =
    "SELECT * FROM applications JOIN projects ON applications.project_id = projects.projectId WHERE applications.user_id = ?";
  db.all(sql, [req.userId], (err, rows) => {
    resHandler(err, rows);
    res.status(200).json({
      applications: rows
    });
  });
};
exports.createApplication = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const application = req.body;
  const insert = `INSERT INTO applications (project_id, user_id, applied_date) VALUES (${
    application.projectId
  }, ${application.userId}, "${new Date().toISOString()}")`;
  db.run(insert, {}, function(err, rows) {
    getById(res, "applications", this.lastID);
  });
};

exports.cancelApplication = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const id = req.body.appId;
  const sql = `DELETE FROM applications WHERE applicationId = ${id}`;
  db.run(sql, [], (err, rows) => {
    resHandler(err, rows);
  });
  res.sendStatus(200);
};
