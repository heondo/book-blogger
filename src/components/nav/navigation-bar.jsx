import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  const { container, user, setUser } = props;
  const theme = useTheme();
  const [state, setState] = useState(false);
  const drawer = (
    <div>
      <List>
        <ListItem button>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        {(user.id ? (
          <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
          </Link>
        ) : undefined)}
        <ListItem button onClick={() => {
          setUser({ id: undefined }); // THIS HAS TO CHANGE
        }}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText>{user.id ? 'Sign Out' : 'Sign In'}</ListItemText>
        </ListItem>
      </List>
    </div>
  );
  const handleDrawerToggle = () => {
    setState(prev => !prev);
  };

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
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </div>

  );
}
