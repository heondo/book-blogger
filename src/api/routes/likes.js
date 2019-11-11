const express = require('express');
const router = express.Router();
const db = require('./../db_connection');

router.use(express.json());

router.post('/', (req, res, next) => {
  const { reviewID, userID } = req.body;
  console.log(userID, reviewID);
  let insertBookmarkQuery = 'INSERT INTO `bookmark` (`user_id`, `review_id`) VALUES(? ,?)';
  db.query(insertBookmarkQuery, [userID, reviewID], (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!data.insertId) {
      res.status(404);
      return next(
        {
          message: 'Could not insert for some mysterious reason'
        }
      );
    }
    res.status(200).json({
      success: true,
      message: `Like inserted with id ${data.insertId}`,
      id: data.insertId
    });
  });
});

router.delete('/', (req, res, next) => {
  const { reviewID, userID } = req.body;
  let deleteBookmarkQuery = 'DELETE FROM `bookmark` WHERE `review_id`=? AND `user_id`=?';
  db.query(deleteBookmarkQuery, [reviewID, userID], (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!data.affectedRows) {
      res.status(404);
      return next({
        message: 'No bookmark found with those specifics'
      });
    }
    res.status(200).json({
      success: true,
      data: data.insertId,
      message: 'Deleted bookmark with id ' + data.insertId
    });
  });
});

module.exports = router;
