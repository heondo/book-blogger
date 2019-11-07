import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, FormRow } from '@material-ui/core';
import ReviewListItem from './review-list-item';

export default function ReviewsList(props) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    handleGetReviews(signal);

    return function cleanup() {
      abortController.abort();
    };
    // console.log(googleKey);
  }, []);

  const handleGetReviews = signal => {
    fetch('/api/reviews', { signal })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.message);
        } else {
          setReviews(res.reviews);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <Container className="reviews-list">
      {
        (reviews.length)
          ? reviews.map(review => (
            <ReviewListItem key={review.id} review={review} />
          ))
          : <Typography>
            No reviews to be found
          </Typography>
      }
    </Container>
  );
}
