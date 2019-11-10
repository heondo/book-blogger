const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

const tagsRoute = require('./routes/tags');
const reviewsRoute = require('./routes/reviews');
const usersRoute = require('./routes/users');
const commentsRoute = require('./routes/comments');

app.use('/api/tags', tagsRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/users', usersRoute);
app.use('/api/comments', commentsRoute);

app.use((err, req, res, next) => {
  res.send({
    error: err.message
  });
});

const port = process.env.PORT || 4001;
const server = http.createServer(app);

server.listen(port, () => console.log('listening at port: ' + port));
