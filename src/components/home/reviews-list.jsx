import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import LoadingCircle from './../helper/loading-circle';
import ReviewListItem from './review-list-item';
import update from 'immutability-helper';

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

  const addReviewBookmark = (reviewIndex, reviewID) => {
    const newReviews = update(reviews, {
      [reviewIndex]: { review_likes: { $push: [user.id] } }
    });
    fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: user.id,
        reviewID
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        setReviews(newReviews);
      })
      .catch(err => console.error(err));
  };

  const unAddReviewBookmark = (reviewIndex, reviewID) => {
    const newReviewLikes = reviews[reviewIndex].review_likes.filter(id => id !== user.id);
    const newReviews = update(reviews, {
      [reviewIndex]: { review_likes: { $set: newReviewLikes } }
    });
    fetch('/api/likes', { method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: user.id,
        reviewID
      }) })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        setReviews(newReviews);
      })
      .catch(err => console.error(err));
  };

  const handleGetReviews = signal => {
    fetch('/api/reviews', { signal })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.message);
        }
        setReviews(res.reviews);
        setReviewsLoaded(prev => !prev);
      })
      .catch(err => console.error(err));
  };

  return (!reviewsLoaded) ? (
    <LoadingCircle />
  ) : (
    <Container>
      {
        (reviews.length)
          ? reviews.map((review, reviewIndex) => (
            <ReviewListItem key={review.id} review={review} addReviewBookmark={addReviewBookmark} unAddReviewBookmark={unAddReviewBookmark} reviewIndex={reviewIndex} user={user}/>
          ))
          : <Typography>
            No reviews to be found
          </Typography>
      }
    </Container>
  );
}
