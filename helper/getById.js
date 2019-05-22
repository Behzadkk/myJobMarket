const db = require("./sqlDB").createDB();
const resHandler = require("./resHandler").resHandler;

exports.getById = (response, tableName, id) => {
  const sql = `SELECT * FROM ${tableName} Where id =?`;
  db.all(sql, [id], (err, rows) => {
    resHandler(err, rows);
    response.status(200).json({
      [tableName]: rows
    });
  });
};
