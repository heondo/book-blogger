const express = require('express');
const router = express.Router();
const db = require('./../db_connection');

router.use(express.json());

router.get('/', (req, res, next) => {
  // this is just getting the relavant information for the home page of reviews;
  // necessary information, book title, authors, review date, user name, description, review, user_id, review_id,

});

router.post('/', (req, res, next) => {
  const { book, review, tags, userID } = req.body;
  let insertReviewID;
  // id is a very special one, the BOOK id that google gave it
  const { id, volumeInfo, saleInfo, accessInfo } = book;
  const reviewTagIDs = [];
  // begin transaction
  db.beginTransaction(err => {
    if (err) {
      res.status(500);
      return next(err);
    }
    // build query to get information from google about the books. some things have to be concatenated and what not
    // but that is because the user is not going to be editing this information anytime soon
    let addBookQuery = 'INSERT IGNORE INTO `book`(`id`, `authors`, `title`, `images`, `links`, `publisher`, `publish_date`, `lang`, `description`, `page_count`, `price`, `currency`, `categories`, `average_rating`, `rating_count`) VALUES (';
    const { title, publisher, publishedDate, description, pageCount, averageRating, ratingsCount, language, authors, categories, imageLinks, previewLink, infoLink, canonicalVolumeLink } = volumeInfo || undefined;
    const { listPrice, retailPrice } = saleInfo || undefined;
    let price;
    let currency;
    if (listPrice) {
      price = listPrice.amount;
      currency = listPrice.currencyCode;
    } else if (retailPrice) {
      price = retailPrice.amount;
      currency = retailPrice.currencyCode;
    }
    const productLinks = JSON.stringify({
      previewLink,
      infoLink,
      canonicalVolumeLink
    });
    const authorsString = authors ? volumeInfo.authors.join(', ') : undefined;
    const categoriesString = categories ? volumeInfo.authors.join(', ') : undefined;
    const imagesJSON = imageLinks ? JSON.stringify(volumeInfo.imageLinks) : undefined;
    const addBookPrepareValues = [id, authorsString, title, imagesJSON, productLinks, publisher, publishedDate, language, description, pageCount, price, currency, categoriesString, averageRating, ratingsCount];
    // add on duplicate key update logic here
    addBookPrepareValues.forEach((q, index, arr) => {
      addBookQuery += (index === arr.length - 1) ? '?)' : '?, ';
    });
    db.query(addBookQuery, addBookPrepareValues, (err, data) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      let addReviewQuery = 'INSERT INTO `review`(`user_id`, `book_id`, `review`, `upload_date`) VALUES (?, ?, ?, UNIX_TIMESTAMP())';
      db.query(addReviewQuery, [userID, id, review], (err, insertReviewData) => {
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
    });
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
