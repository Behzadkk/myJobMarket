exports.createDB = () => {
  const filename = "database/database.sqlite";
  const sqlite3 = require("sqlite3").verbose();
  let db = new sqlite3.Database(filename);
  return db;
};
