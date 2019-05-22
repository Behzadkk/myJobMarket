const db = require("./sqlDB").createDB();
const resHandler = require("./resHandler").resHandler;

exports.getHandler = (response, tableName) => {
  const sql = `SELECT * FROM ${tableName}`;
  db.all(sql, [], (err, rows) => {
    resHandler(err, rows);
    response.status(200).json({
      [tableName]: rows
    });
  });
};
