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
import Login from './user/login';

export default function App(props) {
  const [user, setUser] = useState({ id: null });

  return (
    <Router>
      <NavigationBar user={user}/>
      <Switch>
        <Route key="login" exact path="/login" render={props => <Login {...props} />} />

        <Route key="users-sign-up" exact path="/signup" render={props => <UserSignUp {...props} />} />
        <Route key="review-page" path="/review/:id" render={props => <ReviewPage {...props} user={user} />} />
        <Route key="add-review" exact path="/add-review" render={props => <AddReview {...props} user={user} />} />
        <Route key="home-page" exact path="/" render={props => <ReviewsList {...props} />}/>
      </Switch>
    </Router>
  );
}
