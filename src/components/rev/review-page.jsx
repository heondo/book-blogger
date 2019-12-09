import React, { useState, useEffect, useRef } from 'react';
import Comments from './comments';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Container, Paper, Grid, makeStyles, Box, Typography, Chip, Button, TextField, Collapse } from '@material-ui/core';
import ShopIcon from '@material-ui/icons/Shop';
import Rating from '@material-ui/lab/Rating';
import LoadingCircle from './../helper/loading-circle';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import update from 'immutability-helper';

const useStyles = makeStyles(theme => ({
  paperContainer: {
    padding: '.5rem',
    position: 'relative'
  },
  bookImage: {
    objectFit: 'contain',
    maxHeight: '300px',
    height: 'auto',
    width: '100%'
  },
  description: {
    display: '-webkit-box',
    fontSize: '14px',
    WebkitLineClamp: '5',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  reviewText: {
    whiteSpace: 'pre-line'
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

export default function ReviewPage(props) {
  const classes = useStyles();
  const { user } = props;

  const [review, setReview] = useState({});
  const [reviewEdit, setReviewEdit] = useState(false);
  const [reviewText, setReviewText] = useState(review.review || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const reviewID = props.match.params.id;
  const descriptionEl = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getReview(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const getReview = signal => {
    fetch(`/api/reviews/${reviewID}`, { signal })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        if (res.message === `${reviewID} NA`) {
          throw new Error('No data available');
        }
        setReview(res.review);
        setReviewText(res.review.review);
        setIsLoaded(prev => !prev);
      })
      .catch(error => console.error(error));
  };

  const submitNewReview = () => {
    // if it reaches this function that means there is some text in the review and
    const body = JSON.stringify({
      reviewID,
      reviewText
    });
    fetch('/api/reviews', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        setReviewText(res.review);
        setReviewEdit(!reviewEdit);
      })
      .catch(err => console.error(err));
  };

  const cancelReviewEdit = () => {
    setReviewText(review.review);
    setReviewEdit(false);
  };

  const toggleReviewEdit = () => {
    // if reviewEdit is already true, then submit the new review text;
    if (reviewEdit && reviewText) {
      submitNewReview();
    } else {
      setReviewText(review.review);
      setReviewEdit(!reviewEdit);
    }
  };

  const handleAddBookmark = () => {
    const body = JSON.stringify({
      userID: user.id,
      reviewID: review.id
    });
    fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        const newReview = update(review, {
          review_likes: { $push: [user.id] }
        });
        setReview(newReview);
      })
      .catch(error => console.log(error));
  };

  const handleRemoveBookmark = () => {
    const body = JSON.stringify({
      userID: user.id,
      reviewID: review.id
    });
    fetch('/api/likes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        const newReviewLikes = review.review_likes.filter(id => id !== user.id);
        const newReview = update(review, {
          review_likes: { $set: newReviewLikes }
        });
        setReview(newReview);
      })
      .catch(error => console.log(error));
  };

  return (!isLoaded)
    ? (
      <LoadingCircle />
    )
    : (
      <Container>
        <Paper className={classes.paperContainer}>
          <Grid container spacing={1} justify="flex-start">
            <Grid item container direction="column" justify="flex-start" xs={3} style={{ marginTop: '.5rem' }}>
              <img className={classes.bookImage} src={review.book_info.images.thumbnail.replace(/^http/, 'https') || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvqH_jaoZOvRo6l76ULYm3Rja2vEsNcJ_YjLVE5SO64ijDrKWg&s'} alt="there should be an image link here" />
            </Grid>
            <Grid item xs={9}>
              <Grid container item xs={12} direction="column">
                <Box>
                  <Typography variant="h4">
                    {review.book_info.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography component="span" variant="subtitle1">
                    {review.book_info.authors.join(', ')}
                  </Typography>
                  <Typography component="span">
                    {` - `} {review.book_info.page_count} pages
                  </Typography>
                </Box>
                <Box>
                  <Grid container item alignItems="center">
                    {/* {convertRatingToStars(review.book_info.average_rating)} */}
                    <Rating readOnly value={review.book_info.average_rating} precision={0.5} />
                    <Typography style={{ marginLeft: '.2rem' }}>
                      {` out of `}{review.book_info.rating_count} ratings
                    </Typography>
                  </Grid>
                </Box>
                <Box>
                  <Collapse ref={descriptionEl} in={descriptionExpanded} collapsedHeight="40px">
                    <Typography variant="body2" className={classes.description}>
                      {review.book_info.description}
                    </Typography>
                  </Collapse>
                </Box>
                {!descriptionEl.current ? <Box onClick={() => setDescriptionExpanded(!descriptionExpanded)}>
                  {descriptionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Box>
                  : descriptionEl.current.scrollHeight > 40 ? <Box onClick={() => setDescriptionExpanded(!descriptionExpanded)}>
                    {descriptionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </Box> : undefined
                }
                <Box display={{ xs: 'none', sm: 'block' }}>
                  <Box>
                    {review.tag_array.map((tag, index) => (
                      <Chip key={index} label={tag} style={{ marginRight: '.2rem' }}></Chip>
                    ))}
                  </Box>
                  <Box>
                    <Typography>
                      Published by: {review.book_info.publisher}
                    </Typography>
                  </Box>
                  <Box>
                    {
                      review.book_info.price
                        ? <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <Typography>
                              {review.book_info.price.toFixed(2)} {review.book_info.currency} @
                            </Typography>
                          </Grid>
                          <Grid item>
                            <a rel="noopener noreferrer" target="_blank" href={review.book_info.links.infoLink}><ShopIcon /></a >
                          </Grid>
                        </Grid>
                        : <Typography>
                          Price Info Unavailable
                        </Typography>
                    }
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box display={{ xs: 'block', sm: 'none' }}>
                <Box>
                  {review.tag_array.map((tag, index) => (
                    <Chip key={index} label={tag} style={{ marginRight: '.2rem', marginBottom: '.1rem' }}></Chip>
                  ))}
                </Box>
                <Box>
                  <Typography>
                    Published by: {review.book_info.publisher}
                  </Typography>
                </Box>
                <Box>
                  {
                    review.book_info.price
                      ? <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <Typography>
                            {review.book_info.price.toFixed(2)} {review.book_info.currency} @
                          </Typography>
                        </Grid>
                        <Grid item>
                          <a rel="noopener noreferrer" target="_blank" href={review.book_info.links.infoLink}><ShopIcon /></a >
                        </Grid>
                      </Grid>
                      : <Typography>
                      Price Info Unavailable
                      </Typography>
                  }
                </Box>
              </Box>
              <Box>
                <Typography component="span" variant="h6">
                  Review By: <Link to={`/users/${review.user_id}`}>
                    {review.user_info.first} {review.user_info.last}
                  </Link>
                </Typography>
                <Typography component="span">
                  {` `}- {moment.unix(review.upload_date).calendar()}
                </Typography>
                {
                  (review.user_id === user.id) ? (
                    <>
                    <Button color="default" variant="contained" style={{ marginLeft: '1rem' }} onClick={toggleReviewEdit}>
                      {reviewEdit ? 'Submit' : 'Edit Review'}
                    </Button>
                      {(reviewEdit ? <Button color="default" variant="contained" style={{ marginLeft: '1rem' }} onClick={cancelReviewEdit}>
                        Cancel
                      </Button> : undefined)}
                    </>
                  ) : undefined
                }
              </Box>
              {
                reviewEdit ? (
                  <TextField
                    value={reviewText}
                    className={classes.reviewText}
                    multiline
                    defaultValue="Edit review here"
                    variant="outlined"
                    rows={3}
                    rowsMax={15}
                    onChange={e => {
                      const value = e.target.value;
                      setReviewText(value);
                    }}
                    style={{ width: '100%', marginTop: '1rem' }}/>
                ) : (<Typography className={classes.reviewText}>
                  {reviewText}
                </Typography>)
              }
            </Grid>
            <Grid container justify="center" item xs={12}>
              <Comments reviewID={reviewID} user={user} numComments={review.num_comments} numBookmarks={review.review_likes.length || 0} comments={review.comments}/>
            </Grid>
          </Grid>
          {(user.id && user.id !== review.user_id) ? (
            (review.review_likes.includes(user.id) ? (
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
      </Container>
    );
}
