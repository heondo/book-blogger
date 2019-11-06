import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: 'lightblue'
  },
  title: {
    flexGrow: 1
  },
  homeLink: {
    textDecoration: 'none',
    color: 'black'
  }
}));

export default function NavigationBar(props) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title}>
          <Link className={classes.homeLink} to="/" >Book Blogger</Link>
        </Typography>
        <Button component={Link} to="/add-review">+ Review</Button>
      </Toolbar>
    </AppBar>
  );
}
