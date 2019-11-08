import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Paper, Grid, makeStyles, Box, Typography, Chip } from '@material-ui/core';
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

  const [review, setReview] = useState({});
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
        setReview(res.review);
        setIsLoaded(prev => !prev);
      })
      .catch(error => console.error(error));
  };

  // const convertRatingToStars = rating => {
  //   const wholeRatings = Math.floor(rating);
  //   let stars = [...Array(wholeRatings)].map((star, index) => (
  //     <StarIcon fontSize="small" key={index} />
  //   ));
  //   if (!Number.isInteger(rating)) {
  //     stars.push(<StarHalf fontSize="small"/>);
  //   }
  //   return stars;
  // };

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
                    <Rating value={review.book_info.average_rating} precision={0.5} />
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

                    {/* {review.tag_array.map((tag, index) => (
                      <Chip key={index} label={tag} style={{ marginRight: '.2rem' }}></Chip>
                    ))} */}
                  </Box>
                  <Box>
                    <Typography>
                      Published by: {review.book_info.publisher}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      {review.book_info.price.toFixed(2)} {review.book_info.currency} @ <a rel="noopener noreferrer" target="_blank" href={review.book_info.links.infoLink}>Google Play</a >
                    </Typography>
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
                      ? <Typography>
                        {review.book_info.price.toFixed(2)} {review.book_info.currency} @ <a rel="noopener noreferrer" target="_blank" href={review.book_info.links.infoLink}>Google Play</a >
                      </Typography>
                      : <Typography>
                      No price available
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
              </Box>
              <Typography className={classes.reviewText}>
                {review.review}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
}
