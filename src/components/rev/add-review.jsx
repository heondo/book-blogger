import React, { useState, useEffect } from 'react';
import { Container, TextField, makeStyles, Grid, Typography, Chip, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import googleKey from './../../../google_key.json';

const useStyles = makeStyles(theme => ({
  autocomplete: {
    width: '95%',
    height: '80%'
  },
  reviewHeader: {
    margin: '.4rem 0'
  },
  bookTags: {
    margin: '.2rem 0',
    width: '95%'
  },
  reviewText: {
    width: '95%',
    marginTop: '1rem'
  },
  submitButton: {
    backgroundColor: 'lightblue',
    margin: '.4rem 0',
    color: 'black'
  }
}));

export default function AddReview(props) {
  const classes = useStyles();
  const [matchedBooks, setMatchedBooks] = useState([]);
  const [availTags, setAvailTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [reviewInput, setReviewInput] = useState('');
  const [bookInvalid, setBookInvalid] = useState(false);
  const [tagsInvalid, setTagsInvalid] = useState(false);
  const [reviewInvalid, setReviewInvalid] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getTags(signal);

    return function cleanup() {
      abortController.abort();
    };
    // console.log(googleKey);
  }, []);

  const getTags = signal => {
    fetch('/api/tags', { signal })
      .then(res => res.json())
      .then(res => {
        setAvailTags(res.tags);
      });
  };

  let typingTimer;
  let doneTypingInterval = 1000;

  const getBooks = search => {
    let query = '';
    search.split(' ').forEach((term, index, arr) => {
      (index === arr.length) ? query += `${term}` : query += `${term}+`;
    });
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${googleKey.GOOGLE_KEY}`)
      .then(res => res.json())
      .then(res => setMatchedBooks(res.items))
      .catch(err => console.error(err));
  };

  const findMatchingBooks = event => {
    clearTimeout(typingTimer);
    setBookInvalid(false);
    const searchTerm = event.target.value;
    if (searchTerm) {
      typingTimer = setTimeout(() => { getBooks(searchTerm); }, doneTypingInterval);
    }
  };

  const handleBookEnter = e => {
    const key = e.key;
    const search = e.target.value;
    if (key === 'Enter') {
      clearTimeout(typingTimer);
      getBooks(search);
    }
  };

  const uploadReview = () => {
    if (!selectedBook.id) {
      setBookInvalid(true);
      return;
    } else if (!selectedTags.length) {
      setTagsInvalid(true);
      return;
    } else if (!reviewInput) {
      setReviewInvalid(true);
      return;
    }
    // something happens here
    const body = JSON.stringify({
      userID: props.user.id,
      book: selectedBook,
      review: reviewInput,
      tags: selectedTags
    });
    console.log(body);
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  return (
    <Container>
      <Typography className={classes.reviewHeader} variant="h5" color="textPrimary">
        Review a Book
      </Typography>
      <Autocomplete
        getOptionLabel={option => (option.volumeInfo) ? option.volumeInfo.title : ''}
        disableOpenOnFocus
        options={matchedBooks}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            error={bookInvalid}
            label="Search for a book"
            className={classes.autocomplete}
            onKeyUp={findMatchingBooks}
            onKeyPress={handleBookEnter}
            helperText={bookInvalid ? 'Must enter a valid book' : ''}
          />
        )}
        renderOption={option => {
          let bookImage;
          let TitleAuthor;
          const { volumeInfo } = option;
          if (volumeInfo) {
            if (volumeInfo.imageLinks && volumeInfo.imageLinks.smallThumbnail) {
              bookImage = {
                backgroundImage: `url('${volumeInfo.imageLinks.smallThumbnail}')`,
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
            if (volumeInfo.authors && volumeInfo.authors.length) {
              TitleAuthor = (
                <Typography color= "textPrimary">
                  {`${volumeInfo.title} - ${volumeInfo.authors[0]}`}
                </Typography>);
            } else {
              TitleAuthor = (
                <Typography color="textPrimary">
                  {`${volumeInfo.title}`}
                </Typography>);
            }
            return (
              <Grid container alignItems="center" onClick={() => {
                setSelectedBook(option);
                setMatchedBooks([]);
              }}>
                <Grid item>
                  <div style={bookImage}></div>
                </Grid>
                <Grid item xs>
                  {TitleAuthor}
                </Grid>
              </Grid>
            );
          }
        }}
      />
      <Autocomplete
        freeSolo
        options={availTags}
        multiple
        disableCloseOnSelect
        getOptionLabel={option => (option.tag) ? option.tag : option}
        renderTags={(value, { className }) => {
          // const arrTags = value.map(option => (
          //   (typeof option === 'object' && option.tag) ? option.tag : option
          // ));
          setSelectedTags(value);
          return value.map((option, index) => (
            <Chip
              key={index}
              data-tag-index={index}
              tabIndex={-1}
              label={(option.tag) ? option.tag : option}
              className={className}
            />
          ));
        }

        }
        renderInput={params => (
          <TextField
            {...params}
            freeSolo
            onChange={() => {
              setTagsInvalid(false);
            }}
            error={tagsInvalid}
            helperText={tagsInvalid ? 'Please enter at least one tag' : ''}
            label="Book Tags"
            className={classes.bookTags}
          />
        )}
      />
      <TextField
        id="review-text"
        className={classes.reviewText}
        error={reviewInvalid}
        helperText={reviewInvalid ? 'Without a book review what even is this :(' : ''}
        variant="standard"
        multiline
        rowsMax="7"
        label="Your Review"
        placeholder="Why do you think others should read this book, or why shouldn't they..."
        onChange={e => {
          let text = e.target.value;
          setReviewInvalid(false);
          setReviewInput(text);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.submitButton}
        onClick={uploadReview}>
        Submit
      </Button>
    </Container>
  );
}
