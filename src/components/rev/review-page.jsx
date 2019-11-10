import React, { useState, useEffect } from 'react';
import Comments from './comments';
import moment from 'moment';
import { Container, Paper, Grid, makeStyles, Box, Typography, Chip, Button, TextField } from '@material-ui/core';
import ShopIcon from '@material-ui/icons/Shop';
import Rating from '@material-ui/lab/Rating';
import LoadingCircle from './../helper/loading-circle';

const useStyles = makeStyles(theme => ({
  paperContainer: {
    padding: '.5rem'
  },
  bookImage: {
    objectFit: 'contain',
    maxHeight: '300px',
    height: '100%',
    width: '100%'
  },
  description: {
    display: '-webkit-box',
    WebkitLineClamp: '5',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  reviewText: {
    whiteSpace: 'pre-line'
  }
}));

export default function ReviewPage(props) {
  const classes = useStyles();
  const { user } = props;

  const [review, setReview] = useState({});
  const [reviewEdit, setReviewEdit] = useState(false);
  const [reviewText, setReviewText] = useState(review.review || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const reviewID = props.match.params.id;

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

  const toggleReviewEdit = () => {
    // if reviewEdit is already true, then submit the new review text;
    if (reviewEdit && reviewText) {
      submitNewReview();
    } else {
      setReviewText(review.review);
      setReviewEdit(!reviewEdit);
    }
  };

  return (!isLoaded)
    ? (
      <LoadingCircle />
    )
    : (
      <Container>
        <Paper className={classes.paperContainer}>
          <Grid container spacing={1}>
            <Grid item container xs={3}>
              <img className={classes.bookImage} src={review.book_info.images.thumbnail} alt="there should be an image link here" />
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
                <Box className={classes.description}>
                  <Typography variant="body1">
                    {review.book_info.description}
                  </Typography>
                </Box>
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
                        // <Typography>
                        //   {review.book_info.price.toFixed(2)} {review.book_info.currency} @ <a rel="noopener noreferrer" target="_blank" href={review.book_info.links.infoLink}><ShopIcon /></a >
                        // </Typography>
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
                      // <Typography>
                      //   {review.book_info.price.toFixed(2)} {review.book_info.currency} @ <a rel="noopener noreferrer" target="_blank" href={review.book_info.links.infoLink}><ShopIcon /></a >
                      // </Typography>
                      : <Typography>
                      Price Info Unavailable
                      </Typography>
                  }
                </Box>
              </Box>
              <Box>
                <Typography component="span" variant="h6">
                  Review By: {review.user_info.first} {review.user_info.last}
                </Typography>
                <Typography component="span">
                  {` `}- {moment.unix(review.upload_date).calendar()}
                </Typography>
                {
                  (review.user_id === user.id) ? (
                    <Button color="default" variant="contained" style={{ marginLeft: '1rem' }} onClick={toggleReviewEdit}>
                      {reviewEdit ? 'Submit' : 'Edit Review'}
                    </Button>
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
              <Comments reviewID={reviewID} user={user} numComments={review.num_comments} comments={review.comments}/>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
}
