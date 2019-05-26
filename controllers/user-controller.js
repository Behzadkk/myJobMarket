const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../helper/sqlDB").createDB();
const { resHandler } = require("../helper/resHandler");
const { getById } = require("../helper/getById");

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

exports.createUser = function(req, res) {
  // const { email } = req.body;
  // const sql = "SELECT * FROM users WHERE email =?";
  // db.get(sql, [email], (err, rows) => {
  //   if (err) {
  //     return res.status(500).send("Error on the server.");
  //   }
  //   if (rows) {
  //     return res.status(404).send("User Already exist!!");
  //   }
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
      db.run(insert, {}, function(err, rows) {
        getById(res, "users", this.lastID);
      });
    })
    .catch(err => {
      throw err;
    });
  // });
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

exports.userLogin = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email =?";
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res.status(500).send("Error on the server.");
    }
    if (!user) {
      return res.status(404).send("No user found.");
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      "supersecretkeywhichidontknowwheretorestore",
      {
        expiresIn: 86400 // expires in 24 hours
      }
    );
    res.status(200).send({ userId: user.userId, auth: true, token: token });
  });
};
