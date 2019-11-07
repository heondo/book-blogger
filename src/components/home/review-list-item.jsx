import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, makeStyles, Box } from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const useStyles = makeStyles(theme => ({
  reviewContainer: {
    margin: '1rem 0rem',
    position: 'relative',
    backgroundColor: '#fafaf2',
    padding: '.2rem'
  },
  description: {
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  reviewText: {
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  bookMarkIcon: {
    position: 'absolute',
    top: '0',
    right: '.5rem'
  },
  imageThumbnail: {
    objectFit: 'contain',
    maxHeight: '175px',
    height: '100%',
    width: '100%'
  }
}));

export default function ReviewListItem(props) {
  const { id, user_id, review, upload_date, book_info, user_info, tag_array } = props.review || null;
  const { title, authors, images, description } = book_info || null;

  const classes = useStyles();

  return (
    <Paper className={classes.reviewContainer}>
      <Grid container item xs={12} spacing={1}>
        <Grid container justify="center" item xs={3} sm={2}>
          <img className={classes.imageThumbnail} src={images.thumbnail} alt="there should be an image link here"/>
        </Grid>
        <Grid container item xs={9} sm={10} spacing={1}>
          <Grid container item xs={12} direction="column">
            <Box>
              <Typography variant="h6">
                {title}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                {authors.join(', ')}
              </Typography>
            </Box>
            <Box className={classes.description}>
              <Typography variant="subtitle2">
                {description}
              </Typography>
            </Box>
            <Box className={classes.reviewText}>
              <Typography >
              Review By: <br/> {review}
              </Typography>
            </Box>
            Read Full Review
          </Grid>
        </Grid>
      </Grid>
      <BookmarkBorderIcon
        className={classes.bookMarkIcon}
      />
    </Paper>
  );
}
