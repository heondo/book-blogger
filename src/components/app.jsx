import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavigationBar from './nav/navigation-bar';
import ReviewsList from './home/reviews-list';
import AddReview from './rev/add-review';

export default function App(props) {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route key="add-review" exact path="/add-review" render={props => <AddReview {...props} />} />
        <Route key="home-page" exact path="/" render={props => <ReviewsList {...props}/>}/>
      </Switch>
    </Router>
  );
}
