const bcrypt = require("bcryptjs");

const db = require("../helper/sqlDB").createDB();
const resHandler = require("../helper/resHandler").resHandler;

exports.getUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  db.all(sql, [], (err, rows) => {
    rows.forEach(user => (user.password = null));
    resHandler(err, rows);
    res.status(200).json({
      users: rows
    });
  });
};

exports.createUser = (req, res) => {
  let user = {};
  bcrypt
    .hash(req.body.password, 12)
    .then(hashedPassword => {
      user.email = req.body.email;
      user.password = hashedPassword;
      return user;
    })
    .then(user => {
      const insert = `INSERT INTO users (email, password) VALUES ("${
        user.email
      }", "${user.password}")`;
      db.run(insert, {}, (err, rows) => {
        resHandler(err, rows);
      });
    })
    .catch(err => {
      throw err;
    });
  res.sendStatus(200);
};

exports.userProfile = (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM projects WHERE hirer_id =?";
  db.get(sql, [userId], (err, rows) => {
    resHandler(err, rows);
    res.status(200).json({
      projects: rows
    });
  });
};
