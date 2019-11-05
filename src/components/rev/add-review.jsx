import React, { useState, useEffect } from 'react';
import { Container, TextField, makeStyles, Grid, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import googleKey from './../../../google_key.json';

const useStyles = makeStyles(theme => ({
  autocomplete: {
    width: '95%',
    height: '80%'
  }
}));

export default function AddReview(props) {
  const classes = useStyles();
  const [matchedBooks, setMatchedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});

  useEffect(() => {
    // console.log(googleKey);
  });

  let typingTimer;
  let doneTypingInterval = 500;

  const getBooks = search => {
    let query = '';
    search.split(' ').forEach((term, index, arr) => {
      (index === arr.length) ? query += `intitle:${term}` : query += `intitle:${term}+`;
    });
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${googleKey.GOOGLE_KEY}`)
      .then(res => res.json())
      .then(res => setMatchedBooks(res.items))
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
      <Autocomplete
        getOptionLabel={option => (option.volumeInfo) ? option.volumeInfo.title : ''}
        options={matchedBooks}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Search for a book"
            className={classes.autocomplete}
            onKeyUp={findMatchingBooks}
            onKeyPress={e => {
              const key = e.key;
              const search = e.target.value;
              if (key === 'Enter') {
                clearTimeout(typingTimer);
                getBooks(search);
              }
            }}
          />
        )}
        renderOption={option => {
          let bookImage;
          if (option.volumeInfo) {
            if (option.volumeInfo.imageLinks && option.volumeInfo.imageLinks.smallThumbnail) {
              bookImage = {
                backgroundImage: `url('${option.volumeInfo.imageLinks.smallThumbnail}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100px',
                width: '70px'
              };
            } else {
              bookImage = {
                backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvqH_jaoZOvRo6l76ULYm3Rja2vEsNcJ_YjLVE5SO64ijDrKWg&s')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100px',
                width: '70px'
              };
            }
            return (
              <Grid container alignItems="center" onClick={() => {
                setSelectedBook(option);
              }}>
                <Grid item>
                  <div style={bookImage}></div>
                </Grid>
                <Grid item xs>
                  <Typography color="textPrimary">
                    {(option.volumeInfo) ? `${option.volumeInfo.title}` : ''}
                  </Typography>
                </Grid>
              </Grid>
            );
          }
        }}
      />
    </Container>
  );
}
