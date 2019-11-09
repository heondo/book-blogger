import React, { useState } from 'react';
import { Container, Grid, Box, FormControl, InputLabel, Input, FormHelperText, makeStyles, Button } from '@material-ui/core';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const validateEmail = () => {
    if (!email) {
      setValidEmail(false);
    }
  };

  const handleInputChange = e => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
      setValidEmail(true);
      return;
    }
    setPassword(value);
    setValidPassword(true);
  };

  return (
    <Container>
      <Grid container justify="center" xs={12} spacing={1}>
        <Grid item xs={8}>
          <InputLabel
            htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            error={!validEmail}
            type="email"
            aria-describedby="emailText"
            onChange={handleInputChange}
            style={{ width: '100%' }}/>
          {!validEmail ? (
            <FormHelperText id="email-helper">Not long enough or no match</FormHelperText>
          ) : (
            undefined
          )}
        </Grid>
        <Grid item xs={8}>
          <InputLabel
            htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            error={!validPassword}
            type="password"
            aria-describedby="passwordText"
            style={{ width: '100%' }}
            onChange={handleInputChange} />
        </Grid>
        <Grid container item xs={8} justify="flex-end" spacing={2}>
          <Grid item>
            <Button color="primary" variant="contained">
              Login
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
