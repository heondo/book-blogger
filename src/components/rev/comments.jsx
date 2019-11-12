import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, makeStyles } from '@material-ui/core';
import CommentList from './comment-list';
import update from 'immutability-helper';

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
  const { user, reviewID, numComments, comments, numBookmarks } = props;
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState(comments || []);

  const handleCommentChange = event => {
    const input = event.target.value;
    setComment(input);
  };

  const handleCancelComment = () => {
    setComment('');
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
        addCommentToList(res.commentID);
        setComment('');
      })
      .catch(err => console.error(err));
  };

  const addCommentToList = newID => {
    let user_info;
    if (!user.id) {
      user_info = {
        id: 5,
        first: 'Guest',
        last: 'Guest',
        token: null
      };
    } else {
      user_info = user;
    }
    const body = { user_info, comment_id: newID, comment, comment_date: new Date().getTime() / 1000 };
    const newCommentsList = update(commentList, {
      $unshift: [body]
    });
    setCommentList(newCommentsList);
  };

  return (
    // This is in a grid item / container
    <>
      <Grid xs={12} md={8} item>
        <Typography className={classes.commentAndButtons}>
          {commentList.length} {numComments === 1 ? 'comment' : 'comments'} and {numBookmarks} bookmarks
        </Typography>
      </Grid>
      <Grid container item justify="center" xs={12} md={8} spacing={1}>
        <Grid item xs={12}>
          <TextField name="commentInput" rows={4} rowsMax={12} multiline variant="outlined" onChange={handleCommentChange} className={classes.commentAndButtons} placeholder="Add Comment Here" value={comment}/>
        </Grid>
        <Grid container item justify="flex-end" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={submitComment}>Submit</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleCancelComment}>Cancel</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={8}>
        {commentList.length
          ? <CommentList comments={commentList} />
          : <Typography>No comments</Typography>
        }
      </Grid>
    </>
  );
}
