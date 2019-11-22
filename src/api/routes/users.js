const express = require('express');
const router = express.Router();
const db = require('./../db_connection');
const bcrypt = require('bcryptjs');
const update = require('immutability-helper');
const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });

router.use(express.json());

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  let userQuery = "SELECT u.`id`, u.`first`, u.`last`, u.`join_date`, JSON_ARRAYAGG( JSON_OBJECT( 'review_id', revs.`id`, 'review', revs.`review`, 'num_comments',  revs.`num_comments`, 'review_likes', revs.`review_likes`,'upload_date', revs.`upload_date`, 'tag_array', revs.`tag_array`, 'book_info', revs.`book_info` ) ) AS reviews FROM `user` AS u LEFT JOIN ( SELECT r.`id`, nc.`num_comments`, bm.`review_likes`, r.`review`, r.`user_id`, r.`upload_date`, rt.`tag_array`, b.`book_info` FROM `review` AS r JOIN ( SELECT `review_id`, GROUP_CONCAT(t.`tag`) AS tag_array FROM `review_tag` AS rt JOIN `tag` AS t ON rt.`tag_id` = t.`id` GROUP BY `review_id` ) AS rt ON rt.`review_id` = r.`id` JOIN ( SELECT `id` AS book_id, JSON_OBJECT( 'authors', `authors`, 'title', `title`, 'images', `images`, 'description', `description` ) AS book_info FROM `book` ) AS b ON b.`book_id` = r.`book_id` LEFT JOIN ( SELECT c.`review_id`, COUNT(c.`comment`) AS num_comments FROM `comment` AS c GROUP BY c.`review_id` ) AS nc ON nc.`review_id` = r.`id` LEFT JOIN(SELECT `review_id`, GROUP_CONCAT(`user_id`) as review_likes FROM `bookmark` GROUP BY `review_id`) as bm ON r.`id`=bm.`review_id`) AS revs ON revs.`user_id` = u.`id` WHERE u.`id` = ? GROUP BY u.`id`";
  db.query(userQuery, [id], (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!data.length) {
      res.status(404);
      return next({
        message: 'No user found'
      });
    }
    data[0].reviews = JSON.parse(data[0].reviews) || [];
    data[0].join_date = parseInt(data[0].join_date) || null;
    let deleteThis = false;
    data[0].reviews.forEach(review => {
      if (review.review) {
        review.review_likes = review.review_likes ? review.review_likes.split(',') : '';
        review.book_info.images = JSON.parse(review.book_info.images) || null;
        review.tag_array = review.tag_array.split(',') || null;
        review.upload_date = parseInt(review.upload_date) || null;
        review.book_info.authors = review.book_info.authors.split(',') || null;
      } else {
        deleteThis = true;
      }
    });
    if (deleteThis) {
      data[0].reviews = [];
    }
    res.status(200);
    res.json({ success: true,
      user: data[0] });
  });
});

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
        let query = 'INSERT INTO `user`(`first`, `last`, `email`, `password`, `join_date`) VALUES (?, ?, ?, ?, UNIX_TIMESTAMP())';
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
