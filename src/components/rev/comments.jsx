import React, { useState } from 'react';
import { Box, Button, TextField, Grid, List, Divider, ListItem, ListItemText, Typography, makeStyles } from '@material-ui/core';
import CommentList from './comment-list';

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
  const { user, reviewID, numComments, comments } = props;
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState(comments);

  const handleCommentChange = event => {
    const input = event.target.value;
    setComment(input);
  };

  const submitComment = () => {
    if (!comment || !comment.trim()) {
      return false;
    }
    const body = JSON.stringify({
      userID: user.id,
      reviewID,
      comment
    });
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  return (
    // This is in a grid item / container
    <>
      <Grid xs={12} md={8} item>
        <Typography className={classes.commentAndButtons}>
          {numComments} {numComments === 1 ? 'comment' : 'comments'}
        </Typography>
      </Grid>
      <Grid container item justify="center" xs={12} md={8} spacing={1}>
        <Grid item xs={12}>
          <TextField name="commentInput" rows={4} rowsMax={12} multiline variant="outlined" onChange={handleCommentChange} className={classes.commentAndButtons} placeholder="Add Comment Here" />
        </Grid>
        <Grid container item justify="flex-end" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={submitComment}>Submit</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary">Cancel</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={9}>
        <CommentList comments={comments}/>
      </Grid>
    </>
  );
}
