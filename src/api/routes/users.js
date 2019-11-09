const express = require('express');
const router = express.Router();
const db = require('./../db_connection');
const bcrypt = require('bcryptjs');
const update = require('immutability-helper');

router.use(express.json());

router.post('/signup', (req, res, next) => {
  const { emailInput, firstInput, lastInput, passwordInput } = req.body;
  db.query('SELECT * FROM `user` WHERE email=?', emailInput, (err, data) => {
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
      bcrypt.hash(passwordInput, salt, (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          res.status(500);
          return next(err);
        }
        let query = 'INSERT INTO `user`(`first`, `last`, `email`, `password`) VALUES (?, ?, ?, ?)';
        db.query(query, [firstInput, lastInput, emailInput, hash], (err, data) => {
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
  console.log(email, password);
  db.query('SELECT * FROM `user` WHERE `email`=?', [email], (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!data.length) {
      res.status(404);
      return next({
        message: 'Auth failed'
      });
    }
    bcrypt.compare(password, data[0].password, (err, pwRes) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!pwRes) {
        res.status(404);
        return next({
          message: 'Auth failed'
        });
      }
      res.status(200).json({
        success: true,
        user: update(data[0], {
          password: { $set: null }
        })
      });
    });
  });
});

module.exports = router;
