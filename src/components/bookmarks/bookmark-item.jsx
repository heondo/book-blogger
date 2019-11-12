import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, makeStyles, Box, Collapse } from '@material-ui/core';
import ChatBubble from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  bookmarkItemContainer: {
    margin: '1rem 0rem',
    position: 'relative',
    backgroundColor: '#fafaf2',
    padding: '.2rem'
  },
  description: {
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  collapseContainer: {
    marginTop: '.3rem'
  },
  reviewText: {
    display: '-webkit-box',
    WebkitLineClamp: '20',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  imageThumbnail: {
    objectFit: 'contain',
    maxHeight: '175px',
    height: '100%',
    width: '100%'
  },
  bookMarkIcon: {
    position: 'absolute',
    top: '0',
    right: '.5rem'
  }
}));

export default function BookmarkItem(props) {
  const classes = useStyles();
  const [reviewExpanded, setReviewExpanded] = useState(false);

  const { bookmark, user, unAddReviewBookmark, addReviewBookmark, bookmarkIndex } = props;
  const { book_info, review_text, bookmark_id, user_id, num_comments, user_info, tag_array, review_likes, upload_date, review_id } = bookmark;
  const { images, description, title, authors } = book_info;

  useEffect(() => {

  }, [review_likes]);

  const collapseReview = () => {
    setReviewExpanded(prev => !prev);
  };

  const handleAddBookmark = () => {
    addReviewBookmark(bookmarkIndex, user.id);
  };

  const handleRemoveBookmark = () => {
    unAddReviewBookmark(bookmarkIndex, user.id);
  };

  return (
    <Paper className={classes.bookmarkItemContainer}>
      <Grid container spacing={1}>
        <Grid container item xs={3} sm={2} direction="column">
          <Grid item>
            <img className={classes.imageThumbnail} src={images.thumbnail} alt="there should be an image link here" />
          </Grid>
          <Grid container item justify="flex-start" style={{ margin: '.4rem 0' }}>
            <Grid container item alignItems="center">
              <FavoriteIcon />
              <Typography component="span">
                {review_likes.length}
              </Typography>
            </Grid>
            <Grid container item alignItems="center">
              <ChatBubble />
              <Typography component="span">
                {num_comments || 0}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={9} sm={10} spacing={1}>
          <Grid container item xs={12} direction="column">
            <Box>
              <Typography variant="h6">
                {title}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                {authors.join(', ')}
              </Typography>
            </Box>
            <Box className={classes.description}>
              <Typography variant="subtitle2">
                {description}
              </Typography>
            </Box>
            <Box>
              <Collapse className={classes.collapseContainer} in={reviewExpanded} collapsedHeight="100px">
                <Typography className={classes.reviewText}>
                  Review By: {`${user_info.first} ${user_info.last}`} - {moment.unix(upload_date).calendar()}<br /> {review_text}
                </Typography>
              </Collapse>
            </Box>
            <Box style={{ margin: 'auto' }} onClick={collapseReview}>
              {reviewExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          </Grid>
        </Grid>
        {
          (review_likes.includes(user.id) ? (
            <BookmarkIcon onClick={handleRemoveBookmark}
              className={classes.bookMarkIcon}
            />
          ) : (
            <BookmarkBorderIcon
              onClick={handleAddBookmark}
              className={classes.bookMarkIcon}
            />
          ))
        }
      </Grid>
    </Paper>
  );
}
