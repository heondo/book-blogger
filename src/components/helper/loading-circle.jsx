import React, { useState, useEffect } from 'react';
import { makeStyles, Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  circleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh'
  }
}));

export default function LoadingCircle(props) {
  const classes = useStyles();

  return (
    <Container className={classes.circleContainer}>
      <CircularProgress />
    </Container>
  );
}
