const express = require('express');
const router = express.Router();
const db = require('./../db_connection');

router.get('/', (req, res, next) => {
  let query = 'SELECT * FROM `tag`';
  db.query(query, (err, tags) => {
    if (err) {
      res.status(500).json({
        error: err,
        message: err.message
      }).end();
    } else {
      res.status(200).json({ success: true, tags }).end();
    }
  });
});

module.exports = router;
