import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Drawer } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10
  }
}));

export default function CommentList(props) {
  const classes = useStyles();

  return (
    <List>
      {props.comments.map(comment => (
        <ListItem key={comment.comment_id}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>{`${comment.user_info.first[0]}${comment.user_info.last[0]}`}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={ moment.unix(comment.comment_date).calendar() }
            secondary={
            <>
              {comment.comment}
            </>
            }>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
