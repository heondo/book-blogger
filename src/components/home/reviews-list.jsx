import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, FormRow } from '@material-ui/core';
import LoadingCircle from './../helper/loading-circle';
import ReviewListItem from './review-list-item';

export default function ReviewsList(props) {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const { user } = props;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    handleGetReviews(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const handleGetReviews = signal => {
    fetch('/api/reviews', { signal })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.message);
        } else {
          setReviews(res.reviews);
          setReviewsLoaded(prev => !prev);
        }
      })
      .catch(err => console.error(err));
  };

  return (!reviewsLoaded) ? (
    <LoadingCircle />
  ) : (
    <Container>
      {
        (reviews.length)
          ? reviews.map(review => (
            <ReviewListItem key={review.id} review={review} user={user}/>
          ))
          : <Typography>
            No reviews to be found
          </Typography>
      }
    </Container>
  );
}
