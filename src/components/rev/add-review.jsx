import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import googleKey from './../../../google_key.json';

export default function AddReview(props) {
  let typingTimer;
  let doneTypingInterval = 2500;
  const [matchedBooks, setMatchedBooks] = useState(null);

  useEffect(() => {
    // console.log(googleKey);
  });

  const getBooks = search => {
    let query = '';
    search.split(' ').forEach((term, index, arr) => {
      (index === arr.length) ? query += `intitle:${term}` : query += `intitle:${term}+`;
    });
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${googleKey.GOOGLE_KEY}`)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  const findMatchingBooks = event => {
    clearTimeout(typingTimer);
    const searchTerm = event.target.value;
    if (searchTerm) {
      typingTimer = setTimeout(() => { getBooks(searchTerm); }, doneTypingInterval);
    }
  };

  return (
    <Container>
      <FormControl>
        <InputLabel htmlFor="my-input">Book Title</InputLabel>
        <Input id="my-input" onKeyUp={findMatchingBooks} aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text"></FormHelperText>
      </FormControl>
    </Container>
  );
}
