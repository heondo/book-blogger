import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, makeStyles, Box, Collapse } from '@material-ui/core';
import moment from 'moment';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChatBubble from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

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
    WebkitLineClamp: '20',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  collapseContainer: {
    marginTop: '.3rem'
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
  const classes = useStyles();
  const [reviewExpanded, setReviewExpanded] = useState(false);

  const { id, user_id, review, upload_date, book_info, user_info, tag_array } = props.review || null;
  const { title, authors, images, description } = book_info || null;

  const collapseReview = () => {
    setReviewExpanded(prev => !prev);
  };

  return (
    <Paper className={classes.reviewContainer}>
      <Grid container item xs={12} spacing={1}>
        <Grid container direction="column" justify="flex-start" item xs={3} sm={2}>
          <Grid item>
            <Link to={`/review/${id}`}>
              <img className={classes.imageThumbnail} src={images.thumbnail} alt="there should be an image link here" />
            </Link>
          </Grid>
          <Grid container item justify="flex-start" style={{ margin: '.4rem 0' }}>
            <Grid container item alignItems="center" xs>
              <FavoriteIcon />
              <Typography component="span">
                5
              </Typography>
            </Grid>
            <Grid container item alignItems="center" xs>
              <ChatBubble />
              <Typography component="span">
                20
              </Typography>
            </Grid>
          </Grid>
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
            <Box>
              <Collapse className={classes.collapseContainer} in={reviewExpanded} collapsedHeight="100px">
                <Typography className={classes.reviewText}>
                  Review By: {`${user_info.first} ${user_info.last}`} - {moment.unix(upload_date).calendar()}<br /> {review}
                </Typography>
              </Collapse>
            </Box>
            <Box style={{ margin: 'auto' }} onClick={collapseReview}>
              {reviewExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <BookmarkBorderIcon
        className={classes.bookMarkIcon}
      />
    </Paper>
  );
}
