import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, makeStyles, Box, Collapse, Dialog, DialogTitle, Button } from '@material-ui/core';
import moment from 'moment';
import ChatBubble from '@material-ui/icons/ChatBubble';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles(theme => ({
  reviewContainer: {
    marginTop: '.3rem',
    marginBottom: '.3rem',
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
    WebkitLineClamp: '20',
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'pre-line',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  collapseContainer: {
    marginTop: '.3rem'
  },
  deleteIcon: {
    position: 'absolute',
    top: '1rem',
    right: '1rem'
  },
  imageThumbnail: {
    objectFit: 'contain',
    maxHeight: '175px',
    height: '100%',
    width: '100%'
  },
  buttons: {
    width: '80%',
    margin: '.5rem auto'
  }
}));

export default function UserReviews(props) {
  const classes = useStyles();
  const [reviewExpanded, setReviewExpanded] = useState(false);
  const { review, user, userPageInfo, deleteReview } = props;
  const { book_info, tag_array, review_id, num_comments, upload_date, review_likes } = review;
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const collapseReview = () => {
    setReviewExpanded(prev => !prev);
  };

  const handleClickOpen = () => {
    setConfirmDeleteOpen(!confirmDeleteOpen);
  };

  const handleConfirmDelete = () => {
    deleteReview(review_id, handleClickOpen);
  };

  const ConfirmDeleteModal = () => {
    return (<>
      <Dialog open={confirmDeleteOpen} onClose={handleClickOpen} >
        <DialogTitle>
          Delete Review?
        </DialogTitle>
        <Button className={classes.buttons} variant="contained" color="default" onClick={handleConfirmDelete}>
          Confirm
        </Button>
        <Button className={classes.buttons} variant="contained" color="secondary" onClick={handleClickOpen}>
          Cancel
        </Button>
      </Dialog>
    </>);
  };

  return (
    <Paper className={classes.reviewContainer}>
      <ConfirmDeleteModal />
      <Grid container item xs={12} spacing={1}>
        <Grid container direction="column" justify="flex-start" item xs={3} sm={2}>
          <Grid item>
            <Link to={`/review/${review_id}`}>
              <img src={book_info.images.thumbnail} alt={book_info.title} className={classes.imageThumbnail}/>
            </Link>
          </Grid>
          <Grid container item spacing={1} justify="flex-start">
            <Grid container item alignItems="center" style={{ width: 'auto', marginLeft: '.3rem' }}>
              <BookmarkIcon fontSize="small" variant="subtitle2" />
              <Typography component="span">
                {review_likes.length}
              </Typography>
            </Grid>
            <Grid container item alignItems="center"
              style={{ width: 'auto' }}>
              <ChatBubble fontSize="small" />
              <Typography component="span" variant="subtitle2">
                {num_comments || 0}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={9} sm={10} spacing={1}>
          <Grid container item xs={12} direction="column">
            <Box>
              <Typography variant="h6">
                {book_info.title}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                {book_info.authors.join(', ')}
              </Typography>
            </Box>
            <Box className={classes.description}>
              <Typography variant="subtitle2">
                {book_info.description}
              </Typography>
            </Box>
            <Box>
              <Collapse className={classes.collapseContainer} in={reviewExpanded} collapsedHeight="100px">
                <Typography className={classes.reviewText}>
                  Reviewed {moment.unix(upload_date).calendar()}
                  <br />
                  {review.review}
                </Typography>
              </Collapse>
            </Box>
            <Box style={{ margin: 'auto' }} onClick={collapseReview}>
              {reviewExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {(user.id === userPageInfo.id) ? (
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={handleClickOpen}
        />
      ) : undefined}
    </Paper>
  );
}
