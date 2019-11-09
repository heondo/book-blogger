import React from 'react';
import { Box, Button, TextField, Grid, List, Divider, ListItem, ListItemText, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  commentAndButtons: {
    width: '100%'
  },
  commentInput: {
    width: '60%'
  }
}));

export default function Comments(props) {
  const classes = useStyles();

  return (
    // This is in a grid item / container
    <>
      <Grid xs={12} md={8} item>
        <Typography className={classes.commentAndButtons}>
          Number of comments here
        </Typography>
      </Grid>
      <Grid container item justify="center" xs={12} md={8} spacing={1}>
        <Grid item xs={12}>
          <TextField name="commentInput" variant="outlined" className={classes.commentAndButtons} placeholder="Add Comment Here" />
        </Grid>
        <Grid container item justify="flex-end" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary">Submit</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary">Cancel</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={9}>
      COmments ARE GOING TO GO HERE
      </Grid>
    </>
  );
}
