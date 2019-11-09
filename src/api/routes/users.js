const express = require('express');
const router = express.Router();
const db = require('./../db_connection');

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
  });
});

module.exports = router;
