import React, { useState } from 'react';
import { Container, Grid, FormControl, InputLabel, Input, FormHelperText, makeStyles, Button } from '@material-ui/core';
import update from 'immutability-helper';

const useStyles = makeStyles(theme => ({
  spacingNavFirst: {
    marginTop: '.5rem'
  }
}));

export default function UserSignUp(props) {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    firstInput: '',
    lastInput: '',
    emailInput: '',
    passwordInput: '',
    confirmPasswordInput: ''
  });
  const [validInputs, setValidInputs] = useState({
    firstInput: true,
    lastInput: true,
    emailInput: true,
    passwordInput: true,
    confirmPasswordInput: true
  });

  const verifyInputs = () => {
    let valid = true;
    const { firstInput, lastInput, emailInput, passwordInput, confirmPasswordInput } = inputs;
    const entries = Object.entries(inputs);
    let newValidInputs = Object.assign({}, validInputs);
    for (let input of entries) {
      if (!input[1]) {
        valid = false;
        newValidInputs = update(newValidInputs, {
          [input[0]]: { $set: false }
        });
      }
    }
    if (confirmPasswordInput !== passwordInput) {
      valid = false;
      newValidInputs = update(newValidInputs, {
        confirmPasswordInput: { $set: false },
        passwordInput: { $set: false }
      });
      setValidInputs(newValidInputs);
    }
    if (passwordInput.length < 8) {
      valid = false;
      newValidInputs = update(newValidInputs, {
        passwordInput: { $set: false }
      });
    }
    setValidInputs(newValidInputs);
    return valid;
  };

  const submitNewUser = () => {
    if (!verifyInputs()) {
      return;
    }
    fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        inputs
      )
    })
      .then(res => res.json())
      .then(res => {
        if (res.error === 'Email already taken') {
          setValidInputs(prev => update(prev, {
            emailInput: { $set: false }
          }));
          throw new Error('email taken');
        }
        props.setUser({
          id: res.id,
          first: res.first,
          last: res.last
        });
        props.history.push(`/users/${res.id}`);
      })
      .catch(err => console.error(err));
    // return true;
    // make a request to users to sign up a user
  };

  const handleInputChange = event => {
    const { id, value } = event.target;
    const newInput = update(inputs, {
      [id]: { $set: value }
    });
    setInputs(newInput);
    setValidInputs({
      firstInput: true,
      lastInput: true,
      emailInput: true,
      passwordInput: true,
      confirmPasswordInput: true
    });
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container item xs={8} spacing={1} className={classes.spacingNavFirst}>
        <Grid item xs={6}>
          <FormControl
            style={{ width: '100%' }}>
            <InputLabel
              htmlFor="firstInput">First</InputLabel>
            <Input
              id="firstInput"
              error={!validInputs.firstInput}
              aria-describedby="firstNameInput"
              width={1}
              onChange={handleInputChange}/>
            {!validInputs.firstInput ? (
              <FormHelperText id="first-helper">Please enter a first name</FormHelperText>
            ) : (
              undefined
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor="lastInput">Last</InputLabel>
            <Input
              id="lastInput"
              error={!validInputs.lastInput}
              aria-describedby="lastNameInput"
              onChange={handleInputChange}/>
            {!validInputs.lastInput ? (
              <FormHelperText id="last-helper">Please enter a last name</FormHelperText>
            ) : (
              undefined
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            style={{ width: '100%' }}>
            <InputLabel
              htmlFor="emailInput">Email address</InputLabel>
            <Input
              id="emailInput"
              error={!validInputs.emailInput}
              type="email"
              aria-describedby="emailInputText"
              onChange={handleInputChange}/>
            {!validInputs.emailInput ? (
              <FormHelperText id="email-helper">Invalid email</FormHelperText>
            ) : (
              <FormHelperText id="email-helper">We'll never share your email.</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor="passwordInput">Password</InputLabel>
            <Input id="passwordInput"
              error={!validInputs.passwordInput}
              aria-describedby="passwordInputText" type="password" onChange={handleInputChange}/>
            {!validInputs.passwordInput ? (
              <FormHelperText id="password-helper">Not long enough or no match</FormHelperText>
            ) : (
              undefined
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor="confirmPasswordInput">Confirm Password</InputLabel>
            <Input id="confirmPasswordInput"
              type="password"
              error={!validInputs.confirmPasswordInput}
              aria-describedby="confirmPasswordInputText" onChange={handleInputChange}/>
            {!validInputs.confirmPasswordInput ? (
              <FormHelperText id="confirm-password-helper">Password does not match</FormHelperText>
            ) : (
              undefined
            )}
          </FormControl>
        </Grid>
        <Grid container item xs={12} justify="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={submitNewUser} color="primary" variant="contained">
              Register
            </Button>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
