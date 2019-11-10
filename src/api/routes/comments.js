const express = require('express');
const router = express.Router();
const db = require('./../db_connection');

router.use(express.json());

router.post('/', (req, res, next) => {
  const { userID, comment, reviewID } = req.body;
  let addCommentQuery = 'INSERT INTO `comment`(`comment_date`, `user_id`, `review_id`,`comment`) VALUES(UNIX_TIMESTAMP(), ?, ?, ?)';
  db.query(addCommentQuery, [userID || 5, reviewID, comment], (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200);
    res.json({
      success: true,
      message: `Comment made for review ${reviewID} with ID of: ${data.insertId}`,
      commentID: data.insertId
    });
  });
});

module.exports = router;
