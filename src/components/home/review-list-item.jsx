import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, makeStyles, Box, Collapse } from '@material-ui/core';
import moment from 'moment';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChatBubble from '@material-ui/icons/ChatBubble';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import BookmarkIcon from '@material-ui/icons/Bookmark';
const useStyles = makeStyles(theme => ({
  reviewContainer: {
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
  reviewText: {
    display: '-webkit-box',
    whiteSpace: 'pre-line',
    WebkitLineClamp: '20',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  collapseContainer: {
    marginTop: '.3rem'
  },
  bookMarkIcon: {
    position: 'absolute',
    top: '0',
    right: '.5rem',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .3s ease-in-out'
    }
  },
  imageThumbnail: {
    objectFit: 'contain',
    maxHeight: '175px',
    height: 'auto',
    width: '100%'
  }
}));

export default function ReviewListItem(props) {
  const classes = useStyles();
  const [reviewExpanded, setReviewExpanded] = useState(false);

  const { user, reviewIndex, unAddReviewBookmark, addReviewBookmark } = props;

  const { id, user_id, review, upload_date, book_info, user_info, tag_array, num_comments, review_likes } = props.review || null;
  const { title, authors, images, description } = book_info || null;

  const collapseReview = () => {
    setReviewExpanded(prev => !prev);
  };

  const handleAddBookmark = () => {
    addReviewBookmark(reviewIndex, id);
  };

  const handleRemoveBookmark = () => {
    unAddReviewBookmark(reviewIndex, id);
  };

  return (
    <Paper className={classes.reviewContainer}>
      <Grid container item xs={12} spacing={1}>
        <Grid container direction="column" justify="flex-start" item xs={3} sm={2}>
          <Grid container item justify="center">
            <Link to={`/review/${id}`}>
              <img className={classes.imageThumbnail} src={images.thumbnail} alt="there should be an image link here" />
            </Link>
          </Grid>
          <Grid container item spacing={1} justify="flex-start">
            <Grid container item alignItems="center" style={{ width: 'auto', marginLeft: '.3rem' }}>
              <BookmarkIcon fontSize="small"/>
              <Typography component="span" variant="subtitle2">
                {review_likes.length}
              </Typography>
            </Grid>
            <Grid container item alignItems="center"
              style= {{ width: 'auto' }}>
              <ChatBubble fontSize="small" style={{ marginRight: '.1rem' }}/>
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
              <Collapse className={classes.collapseContainer} in={reviewExpanded} collapsedHeight="100px">
                <Typography
                  className={classes.reviewText}
                  variant="body1"
                >
                  Review By: {`${user_info.first} ${user_info.last}`} - {moment.unix(upload_date).calendar()}<br /> {review}
                </Typography>
              </Collapse>
            </Box>
            <Box style={{ margin: 'auto' }} onClick={collapseReview}>
              {reviewExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {(user.id && user.id !== user_id) ? (
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
      )
        : undefined
      }
    </Paper>
  );
}
