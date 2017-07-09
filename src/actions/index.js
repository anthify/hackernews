import "whatwg-fetch";
import { Fetching, Fetched, Oops, API } from "../constants/";

export const fetchingNews = () => ({
  type: Fetching.NEWS
});

export const fetchedNews = news => ({
  type: Fetched.NEWS,
  news
});

export const oopsNews = error => ({
  type: Oops.NEWS,
  error
});

export const fetchNews = () => {
  return dispatch => {
    dispatch(fetchingNews());
    return fetch(API.news)
      .then(response => response.json())
      .then(news => dispatch(fetchedNews(news)))
      .catch(err => dispatch(oopsNews(err)));
  };
};
