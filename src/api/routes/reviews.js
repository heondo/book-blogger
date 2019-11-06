const express = require('express');
const router = express.Router();
const db = require('./../db_connection');

router.use(express.json());

router.post('/', (req, res, next) => {
  const { book, review, tags, userID } = req.body;
  let insertReviewID;
  const reviewTagIDs = [];
  // begin transaction
  db.beginTransaction(err => {
    if (err) {
      res.status(500);
      next(err);
    }
    // MUST ADD BOOK BEFORE THIS ADD REVIEW QUERY
    // db.query(addBookQuery, [book information will all go in here], (err, data) => {
    //   if (err) {
    //     res.status(500);
    //     next(err);
    //   }
    //   // after adding the book is successful and you have the book ID RIGHT HERE then do the stuff below with some minor changes
    // })

    // segment to run inside of the addBookQuery callback after success
    let addReviewQuery = 'INSERT INTO `review`(`user_id`, `book_info`, `review`) VALUES (?, ?, ?)';
    // query to add a user review into the database, must stringify the json book object for now....not sure if I have to deal with this a separate way

    db.query(addReviewQuery, [userID, JSON.stringify(book), review], (err, insertReviewData) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      insertReviewID = insertReviewData.insertId;
      tags.forEach(tag => {
        if (typeof tag === 'object') {
          reviewTagIDs.push(tag.id);
        }
      });
      const newTags = tags.filter(tag => typeof tag === 'string');
      if (newTags.length) {
        let makeNewTagsQuery = 'INSERT IGNORE INTO `tag`(`tag`) VALUES ';
        let getNewTagsQuery = 'SELECT * FROM `tag` WHERE `tag` IN (';
        newTags.forEach((tag, index) => {
          makeNewTagsQuery += (index === newTags.length - 1) ? '(UPPER(?))' : '(UPPER(?)), ';
          getNewTagsQuery += (index === newTags.length - 1) ? 'UPPER(?))' : 'UPPER(?),';
        });
        db.query(makeNewTagsQuery, newTags, (err, data) => {
          if (err) {
            res.status(500);
            return next(err);
          }
          db.query(getNewTagsQuery, newTags, (err, data) => {
            if (err) {
              res.status(500);
              return next(err);
            }
            data.forEach(tag => { reviewTagIDs.push(tag.id); });
            makeReviewTags(insertReviewID, reviewTagIDs, res, next);
          });
        });
      } else {
        makeReviewTags(insertReviewID, reviewTagIDs, res, next);
      }
    });
    // I think you can just run the above segment after the addbookQuery fails or succeeds

  });
});

const makeReviewTags = (reviewID, tagIDs, res, next) => {
  let makeReviewTagsQuery = 'INSERT INTO `review_tag`(`review_id`, `tag_id`) VALUES ';
  let reviewTagsArray = [];
  tagIDs.forEach((tag, index, arr) => {
    makeReviewTagsQuery += (index === arr.length - 1) ? '(?, ?)' : '(?, ?), ';
    reviewTagsArray.push(reviewID, tag);
  });
  db.query(makeReviewTagsQuery, reviewTagsArray, (err, data) => {
    if (err) {
      res.status(502);
      return next(err);
    }
    db.commit(err => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).json({ success: true, data: `One review created at ID ${reviewID}` });
    });
  });
};

module.exports = router;
