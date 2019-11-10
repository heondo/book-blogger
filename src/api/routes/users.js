const express = require('express');
const router = express.Router();
const db = require('./../db_connection');
const bcrypt = require('bcryptjs');
const update = require('immutability-helper');
const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });

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
            id: data.insertId,
            first: firstInput,
            last: lastInput
          });
        });
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
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
      const token = jwt.sign({
        email: data[0].email,
        userId: data[0].id
      },
      process.env.JWT_KEY, {
        expiresIn: '6h'
      });
      res.status(200).json({
        success: true,
        userID: data[0].id,
        first: data[0].first,
        last: data[0].last,
        token
      });
    });
  });
});

module.exports = router;
