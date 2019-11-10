const express = require('express');
const router = express.Router();
const db = require('./../db_connection');

router.use(express.json());

router.patch('/', (req, res, next) => {
  const { reviewID, reviewText } = req.body;
  let editReviewQuery = 'UPDATE `review` SET `review`=? WHERE `id`=?';
  db.query(editReviewQuery, [reviewText, reviewID], (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).json({
      success: true,
      review: reviewText,
      message: `Review of ID ${data.insertId} updated`
    });
  });
});

router.get('/:id', (req, res, next) => {
  const reviewID = req.params.id;
  let singleReviewQuery = "SELECT r.`id`, c.`comments`, c.`num_comments`, r.`user_id`, r.`review`, r.`upload_date`, b.`book_info`, u.`user_info`, review_tags.`tag_array` FROM `review` AS r JOIN ( SELECT `review_id`, GROUP_CONCAT(t.`tag`) AS tag_array FROM `review_tag` AS rt JOIN `tag` AS t ON rt.`tag_id` = t.`id` WHERE `review_id` = ? GROUP BY `review_id` ) AS review_tags ON review_tags.`review_id` = r.`id` JOIN ( SELECT `id` AS user_id, JSON_OBJECT( 'first', `first`, 'last', `last` ) AS user_info FROM `user` ) AS u ON u.`user_id` = r.`user_id` JOIN ( SELECT `id` AS book_id, JSON_OBJECT( 'authors', `authors`, 'title', `title`, 'images', `images`, 'description', `description`, 'price', `price`, 'currency', `currency`, 'links', `links`, 'publisher', `publisher`, 'publish_date', `publish_date`, 'lang', `lang`, 'page_count', `page_count`, 'categories', `categories`, 'average_rating', `average_rating`, 'rating_count', `rating_count` ) AS book_info FROM `book` ) AS b ON b.`book_id` = r.`book_id` LEFT JOIN ( SELECT c.`review_id`, COUNT(c.`comment`) as num_comments, JSON_ARRAYAGG( JSON_OBJECT('comment_id', c.`id`,'comment_date', c.`comment_date`, 'user_info', u.`user_info`, 'comment', c.`comment`) ) as comments FROM `comment` AS c JOIN ( SELECT `id` AS user_id, JSON_OBJECT( 'first', `first`, 'last', `last` ) AS user_info FROM `user` ) AS u ON c.`user_id` = u.`user_id` WHERE c.`review_id`=? GROUP BY c.`review_id` ) as c ON c.`review_id`=r.`id` WHERE r.`id` = ? ORDER BY r.`upload_date` DESC LIMIT 50";
  db.query(singleReviewQuery, [reviewID, reviewID, reviewID], (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    } else if (!data.length) {
      res.status(404);
      return next({ error: `${reviewID} NA` });
    }
    data[0].tag_array = data[0].tag_array.split(',');
    data[0].upload_date = parseInt(data[0].upload_date) || null;
    data[0].comments = JSON.parse(data[0].comments) || null;
    (data[0].comments) ? data[0].comments.forEach(comment => comment.comment_date = parseInt(comment.comment_date)) : null;
    (data[0].comments) ? data[0].comments.sort((a, b) => (a.comment_date < b.comment_date) ? 1 : -1) : null;
    data[0].book_info = JSON.parse(data[0].book_info);
    data[0].user_info = JSON.parse(data[0].user_info);
    data[0].book_info.images = data[0].book_info.images ? JSON.parse(data[0].book_info.images) : null;
    data[0].book_info.links = data[0].book_info.links ? JSON.parse(data[0].book_info.links) : null;
    data[0].book_info.authors = data[0].book_info.authors ? data[0].book_info.authors.split(',') : null;
    res.status(200).json({
      success: true,
      review: data[0]
    });
  });
});

router.get('/', (req, res, next) => {
  // this is just getting the relavant information for the home page of reviews;
  // necessary information, book title, authors, review date, user name, description, review, user_id, review_id
  // I need information from basically every table. First get review tags joined with the tags into an array and group by the review id;
  // then get the book information that you need and make it a json but thats not even necessary;
  // then get the single review, get the book information and the review tags information. Join user id.
  let getReviewsListQuery = "SELECT r.`id`, r.`user_id`, c.`num_comments`, r.`review`, r.`upload_date`, b.`book_info`, u.`user_info`, review_tags.`tag_array` FROM `review` AS r JOIN ( SELECT `review_id`, GROUP_CONCAT(t.`tag`) AS tag_array FROM `review_tag` AS rt JOIN `tag` AS t ON rt.`tag_id` = t.`id` GROUP BY `review_id` ) AS review_tags ON review_tags.`review_id` = r.`id` JOIN ( SELECT `id` AS user_id, JSON_OBJECT('first', `first`, 'last', `last`) AS user_info FROM `user` ) AS u ON u.`user_id` = r.`user_id` JOIN ( SELECT `id` AS book_id, JSON_OBJECT( 'authors', `authors`, 'title', `title`, 'images', `images`, 'description', `description` ) AS book_info FROM `book` ) AS b ON b.`book_id` = r.`book_id` LEFT JOIN ( SELECT c.`review_id`, COUNT(c.`comment`) as num_comments FROM `comment` as c GROUP BY c.`review_id` ) as c ON c.`review_id`=r.`id` ORDER BY r.`upload_date` DESC LIMIT 50";
  db.query(getReviewsListQuery, (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    data.forEach(review => {
      review.tag_array = review.tag_array.split(',');
      review.book_info = JSON.parse(review.book_info);
      review.user_info = JSON.parse(review.user_info);
      review.book_info.images = review.book_info.images ? JSON.parse(review.book_info.images) : null;
      review.book_info.authors = review.book_info.authors ? review.book_info.authors.split(',') : null;
    });
    res.status(200).json({
      success: true,
      reviews: data
    });
  });
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
    const authorsString = authors ? authors.join(',') : undefined;
    const categoriesString = categories ? categories.join(',') : undefined;
    const imagesJSON = imageLinks ? JSON.stringify(imageLinks) : undefined;
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
