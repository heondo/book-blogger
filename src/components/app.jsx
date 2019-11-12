import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavigationBar from './nav/navigation-bar';
import ReviewsList from './home/reviews-list';
import AddReview from './rev/add-review';
import UserSignUp from './user/signup';
import ReviewPage from './rev/review-page';
import MyBookmarks from './bookmarks/my-bookmarks';
import UserPage from './user/user-page';
import Login from './user/login';

export default function App(props) {
  const [user, setUser] = useState({ id: undefined });

  return (
    <Router>
      <NavigationBar user={user} setUser={setUser}/>
      <Switch>
        <Route key="login" exact path="/login" render={props => <Login {...props} setUser={setUser}/>} />
        <Route key="users-sign-up" exact path="/signup" render={props => <UserSignUp {...props} setUser={setUser}/>} />
        <Route key="review-page" path="/review/:id" render={props => <ReviewPage {...props} user={user} />} />
        <Route key="my-bookmarks" path="/bookmarks" render={props => <MyBookmarks {...props} user={user} />} />
        <Route key="user-page" path="/users/:id" render={props => <UserPage {...props} user={user} />}/>
        <Route key="add-review" exact path="/add-review" render={props => <AddReview {...props} user={user} />} />
        <Route key="home-page" exact path="/" render={props => <ReviewsList {...props} user={user}/>}/>
      </Switch>
    </Router>
  );
}
