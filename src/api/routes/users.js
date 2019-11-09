const express = require('express');
const router = express.Router();
const db = require('./../db_connection');
const bcrypt = require('bcryptjs');

router.post('/signup', (req, res, next) => {
  const { email, first, last, password } = req.body;
  db.query('SELECT * FROM `user` WHERE email=?', email, (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (data.length) {
      res.status(404);
      return next({ message: 'Email already taken' });
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          res.status(500);
          return next(err);
        }
        let query = 'INSERT INTO `user`(`first`, `last`, `email`, `password`) VALUES (?, ?, ?, ?)';
        db.query(query, [first, last, email, hash], (err, data) => {
          if (err) {
            res.status(500);
            return next(err);
          }
          res.status(200);
          res.json({
            success: true,
            message: `User created at id ${data.insertId}`,
            id: data.insertId
          });
        });
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

});

module.exports = router;
