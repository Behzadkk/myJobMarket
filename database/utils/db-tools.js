const fs = require("fs");
const filename = "database/database.sqlite";
const sqlite3 = require("sqlite3").verbose();

function resetDataBase() {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }

  let db = new sqlite3.Database(filename);

  fs.readFile("database/schema.sql", "utf8", (error, data) => {
    if (error) {
      console.error(error);
    } else if (data) {
      console.log(data);
      db.exec(data);
    }
  });
}

module.exports = resetDataBase;
