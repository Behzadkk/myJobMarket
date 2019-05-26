const db = require("../helper/sqlDB").createDB();
const resHandler = require("../helper/resHandler").resHandler;

exports.getApplications = (req, res) => {
  const sql = "SELECT * FROM applications";
  db.all(sql, [], (err, rows) => {
    resHandler(err, rows);
    res.status(200).json({
      application: rows
    });
  });
};
exports.createApplication = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const application = req.body;
  const insert = `INSERT INTO applications (project_id, user_id) VALUES (${
    application.projectId
  }, ${application.userId})`;
  db.run(insert, {}, (err, rows) => {
    resHandler(err, rows);
  });
  res.sendStatus(200);
};

exports.cancelApplication = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const id = req.params.id;
  const sql = `DELETE FROM applications WHERE appId = ${id}`;
  db.run(sql, [], (err, rows) => {
    resHandler(err, rows);
  });
  res.sendStatus(200);
};
