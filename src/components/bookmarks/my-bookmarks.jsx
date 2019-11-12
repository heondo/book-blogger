import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import LoadingCircle from './../helper/loading-circle';
import update from 'immutability-helper';
import BookmarkItem from './bookmark-item';

export default function MyBookmarks(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksLoaded, setBookmarksLoaded] = useState(false);
  const { user } = props;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getBookmarks(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const getBookmarks = signal => {
    if (!user.id) {
      return false;
    }
    fetch(`/api/likes/${user.id}`)
      .then(res => res.json())
      .then(res => {
        setBookmarks(res.bookmarks);
        setBookmarksLoaded(true);
      })
      .catch(err => console.error(err));
  };

  const addReviewBookmark = (bookmarkIndex, userID) => {
    const newBookmarks = update(bookmarks, {
      [bookmarkIndex]: {
        review_likes: { $push: [userID] }
      }
    });
    const body = JSON.stringify({
      userID,
      reviewID: bookmarks[bookmarkIndex].review_id
    });
    fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        setBookmarks(newBookmarks);
      })
      .catch(error => console.error(error));
  };

  const unAddReviewBookmark = (bookmarkIndex, userID) => {
    // lol messed up there
    // const body = JSON.stringify({
    //   reviewID,
    //   userID
    // });
    const newReviewLikes = bookmarks[bookmarkIndex].review_likes.filter(user => user !== userID);
    const newBookmarks = update(bookmarks, {
      [bookmarkIndex]: {
        review_likes: { $set: newReviewLikes }
      }
    });
    const body = JSON.stringify({
      userID,
      reviewID: bookmarks[bookmarkIndex].review_id
    });
    fetch('/api/likes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        setBookmarks(newBookmarks);
      })
      .catch(error => console.error(error));
    // console.log(newReviewLikes);
    // setBookmarks(newBookmarks);
  };

  return (!bookmarksLoaded)
    ? (
      <LoadingCircle />
    )
    : (
      <Container>
        {
          bookmarks.length ? (bookmarks.map((bookmark, bookmarkIndex) => {
            return (
              <BookmarkItem
                key={bookmark.bookmark_id}
                bookmarkIndex={bookmarkIndex}
                bookmark={bookmark}
                user={user}
                unAddReviewBookmark={unAddReviewBookmark}
                addReviewBookmark={addReviewBookmark}
              />
            );
          })
          )
            : (
              <Typography>
              No bookmarks
              </Typography>
            )

        }
      </Container>
    );
}
