import React, { useState, useEffect } from 'react';
import LoadingCircle from './../helper/loading-circle';
import { Container, Paper, Grid, makeStyles, Box, Typography, Chip, Button, TextField } from '@material-ui/core';
import UserReviews from './user-reviews';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  paperContainer: {
    padding: '.5rem'
  }
}));

export default function UserPage(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();
  const [userPageInfo, setUserPageInfo] = useState({});

  const { user } = props;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getUserInfo(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const getUserInfo = signal => {
    const userPageID = parseInt(props.match.params.id);
    fetch(`/api/users/${userPageID}`, { signal })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        setUserPageInfo(res.user);
        setIsLoaded(true);
      })
      .catch(err => console.error(err));
  };

  return (
    (!isLoaded)
      ? (
        <LoadingCircle />
      )
      : (
        <Container>
          <Paper className={classes.paperContainer}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4">
                  {`${userPageInfo.first} ${userPageInfo.last}`}
                </Typography>
                <Typography>
                  Joined: {moment.unix(userPageInfo.join_date).calendar()}
                </Typography>
                <Typography>
                  {userPageInfo.reviews.length || 0} reviews
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {userPageInfo.reviews.map(review => (
                  <UserReviews key={review.review_id} review={review} user={user} userPageInfo={userPageInfo}/>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )
  );
}
