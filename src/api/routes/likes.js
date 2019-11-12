const express = require('express');
const router = express.Router();
const db = require('./../db_connection');

router.use(express.json());

router.get('/:id', (req, res, next) => {
  // get related review/book information based on user id;
  const { id } = req.params;

  let bookmarksQuery = "SELECT bm.`id` as bookmark_id, reviews.*, likes.`review_likes` FROM `bookmark` AS bm LEFT JOIN (SELECT r.`id` as review_id, r.`user_id`, c.`num_comments`, r.`review` as review_text, r.`upload_date`, b.`book_info`, u.`user_info`, review_tags.`tag_array` FROM `review` AS r JOIN ( SELECT `review_id`, GROUP_CONCAT(t.`tag`) AS tag_array FROM `review_tag` AS rt JOIN `tag` AS t ON rt.`tag_id` = t.`id` GROUP BY `review_id` ) AS review_tags ON review_tags.`review_id` = r.`id` JOIN ( SELECT `id` AS user_id, JSON_OBJECT( 'email', `email`, 'first', `first`, 'last', `last` ) AS user_info FROM `user` ) AS u ON u.`user_id` = r.`user_id` JOIN ( SELECT `id` AS book_id, JSON_OBJECT( 'authors', `authors`, 'title', `title`, 'images', `images`, 'description', `description` ) AS book_info FROM `book` ) AS b ON b.`book_id` = r.`book_id` LEFT JOIN ( SELECT c.`review_id`, COUNT(c.`comment`) as num_comments FROM `comment` as c GROUP BY c.`review_id` ) as c ON c.`review_id`=r.`id` ORDER BY r.`upload_date`) as reviews ON bm.`review_id`=reviews.`review_id` LEFT JOIN(SELECT `review_id`, GROUP_CONCAT(`user_id`) as review_likes FROM `bookmark` GROUP BY `review_id`) as likes ON bm.`review_id`=likes.`review_id` WHERE bm.`user_id` = ?";
  db.query(bookmarksQuery, [id], (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    data.forEach(bm => {
      bm.tag_array = bm.tag_array.split(',');
      bm.book_info = JSON.parse(bm.book_info) || null;
      bm.book_info.images = (bm.book_info.images) ? JSON.parse(bm.book_info.images) : null;
      bm.book_info.authors = bm.book_info.authors.split(',') || [];
      bm.review_likes = bm.review_likes.split(',').map(i => parseInt(i));
      bm.user_info = JSON.parse(bm.user_info) || null;
      bm.upload_date = parseInt(bm.upload_date);
    });
    res.status(200).json({
      success: true,
      bookmarks: data
    });
  });
});

router.post('/', (req, res, next) => {
  const { reviewID, userID } = req.body;
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
