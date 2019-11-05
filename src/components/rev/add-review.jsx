import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';

export default function AddReview(props) {
  let typingTimer;
  let doneTypingInterval = 3000;

  const getBooks = search => {
    // https://www.googleapis.com/books/v1/volumes?q=intitle:flowers+intitle:for+intitle:algernon&key=AIzaSyCWq6apxh7IJs8njuJgCEJf5QPenKjrCYc
    let query = '';
    search.split(' ').forEach((term, index, arr) => {
      (index === arr.length) ? query += `intitle:${term}` : query += `intitle:${term}+`;
    });
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=yourAPIKey`);
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
