import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Paper, makeStyles, Box, Collapse } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ChatBubble from '@material-ui/icons/ChatBubble';
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
    whiteSpace: 'pre-line',
    textOverflow: 'ellipsis'
  },
  imageThumbnail: {
    objectFit: 'contain',
    maxHeight: '175px',
    height: 'auto',
    width: '100%'
  },
  bookMarkIcon: {
    position: 'absolute',
    top: '0',
    right: '.5rem',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .3s ease-in-out'
    }
  }
}));

export default function BookmarkItem(props) {
  const classes = useStyles();
  const [reviewExpanded, setReviewExpanded] = useState(false);
  const reviewEl = useRef(null);
  const { bookmark, user, unAddReviewBookmark, addReviewBookmark, bookmarkIndex } = props;
  const { book_info, review_text, bookmark_id, user_id, num_comments, user_info, tag_array, review_likes, upload_date, review_id } = bookmark;
  const { images, description, title, authors } = book_info;

  useEffect(() => {}, [review_likes]);

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
        <Grid container item xs={3} sm={2} spacing={1}direction="column">
          <Grid container item justify="center">
            <Link to={`/review/${review_id}`}>
              <img className={classes.imageThumbnail} src={images.thumbnail} alt="there should be an image link here" />
            </Link>
          </Grid>
          <Grid container item spacing={1} justify="center">
            <Grid container item alignItems="center" xs>
              <BookmarkIcon fontSize="small" />
              <Typography component="span" variant="subtitle2">
                {review_likes.length || 0}
              </Typography>
            </Grid>
            <Grid container item alignItems="center" xs>
              <ChatBubble fontSize="small" />
              <Typography component="span" variant="subtitle2">
                {num_comments || 0}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={9} sm={10} spacing={1}>
          <Grid container item xs={12} direction="column">
            <Box width={0.9}>
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
              <Collapse ref={reviewEl} className={classes.collapseContainer} in={reviewExpanded} collapsedHeight="100px">
                <Typography className={classes.reviewText}>
                  Review By: {`${user_info.first} ${user_info.last}`} - {moment.unix(upload_date).calendar()}<br /> {review_text}
                </Typography>
              </Collapse>
            </Box>
            {!reviewEl.current ? <Box style={{ margin: 'auto' }} onClick={collapseReview}>
              {reviewExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
              : reviewEl.current.scrollHeight > 100 ? <Box style={{ margin: 'auto' }} onClick={collapseReview}>
                {reviewExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Box> : undefined
            }
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
