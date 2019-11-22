import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Drawer, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BookmarkIcon from '@material-ui/icons/Bookmark';

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
  },
  random: theme.mixins.toolbar
}));

export default function NavigationBar(props) {
  const classes = useStyles();
  const { container, user, setUser } = props;
  const theme = useTheme();
  const [state, setState] = useState(false);

  const handleDrawerToggle = () => {
    setState(prev => !prev);
  };

  const drawer = (
    <div>
      <div className={classes.random}/>
      <Divider/>
      <List>
        <Link to='/' onClick={handleDrawerToggle} style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
            <ListItemIcon ><HomeIcon /></ListItemIcon>
            <ListItemText style={{ textDecoration: 'none', color: 'black' }}>Home</ListItemText>
          </ListItem>
        </Link>
        {(user.id ? (
          <>
            <Link to={`/users/${user.id}`} onClick={handleDrawerToggle} style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem button>
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText style={{ textDecoration: 'none', color: 'black' }}>Profile</ListItemText>
              </ListItem>
            </Link>
            <Link to={`/bookmarks`} onClick={handleDrawerToggle} style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem button>
                <ListItemIcon><BookmarkIcon /></ListItemIcon>
                <ListItemText style={{ textDecoration: 'none', color: 'black' }}>My Bookmarks</ListItemText>
              </ListItem>
            </Link>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }} onClick={() => {
              props.setUser({ id: undefined });
            }}>
              <ListItem onClick={() => {
                setUser(null);
                handleDrawerToggle();
              }}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
              </ListItem>
            </Link>
          </>
        ) : (
          <>
              <Link to={`/login`} onClick={handleDrawerToggle} style={{ textDecoration: 'none', color: 'black' }}>
                <ListItem button>
                  <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                  <ListItemText style={{ textDecoration: 'none', color: 'black' }}>Login</ListItemText>
                </ListItem>
              </Link>
              <Link to={`/signup`} onClick={handleDrawerToggle} style={{ textDecoration: 'none', color: 'black' }}>
                <ListItem button>
                  <ListItemIcon><PersonAddIcon /></ListItemIcon>
                  <ListItemText style={{ textDecoration: 'none', color: 'black' }}>Sign Up</ListItemText>
                </ListItem>
              </Link>
          </>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>
            <Link className={classes.homeLink} to="/" >Book Blogger</Link>
          </Typography>
          {user.id ? (<Button component={Link} to="/add-review">+ Review</Button>) : (
            <>
              <Button component={Link} to="/signup">
                Sign Up
              </Button>
              <Button component={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={state}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </div>

  );
}
