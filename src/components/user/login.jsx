import React, { useState } from 'react';
import { Container, Grid, FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const areFieldsFilled = () => {
    let checker = true;
    if (!email) {
      setValidEmail(false);
      checker = false;
    }
    if (!password) {
      setValidPassword(false);
      checker = false;
    }
    return checker;
  };

  const handleInputChange = e => {
    const { id, value } = e.target;
    setLoginFailed(false);
    if (id === 'email') {
      setEmail(value);
      setValidEmail(true);
      return;
    }
    setPassword(value);
    setValidPassword(true);
  };

  const handleLogin = () => {
    if (!areFieldsFilled()) {
      return false;
    }
    fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.error === 'Auth failed') {
          setLoginFailed(true);
          throw new Error('Login Failed');
        }
        // IDK IF THIS IS GOING TO RETURN THE SAME ID THING ANYMORE
        props.setUser({
          id: res.userID,
          token: res.token,
          first: res.first,
          last: res.last
        });
        props.history.push(`/users/${res.userID}`);
      })
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Grid container item justify="center" xs={12} spacing={1} style={{ marginTop: '1rem' }}>
        <Grid item xs={8}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel
              htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              required
              error={!validEmail}
              type="email"
              aria-describedby="emailText"
              onChange={handleInputChange}
              style={{ width: '100%' }} />
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel
              htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              required
              error={!validPassword}
              type="password"
              aria-describedby="passwordText"
              style={{ width: '100%' }}
              onChange={handleInputChange} />
          </FormControl>
        </Grid>
        {loginFailed ? (
          <Grid item xs={8}>
            <FormHelperText style={{ color: 'red' }}>
            Login Failed
            </FormHelperText>
          </Grid>)
          : undefined
        }
        <Grid container item xs={8} justify="flex-end" spacing={2}>
          <Grid item>
            <Button color="primary" variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained" onClick={() => props.history.push('/')}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
