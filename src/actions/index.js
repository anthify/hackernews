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

export const fetchingJobs = () => ({
  type: Fetching.JOBS
});

export const fetchedJobs = jobs => ({
  type: Fetched.JOBS,
  jobs
});

export const oopsJobs = error => ({
  type: Oops.JOBS,
  error
});

export const fetchJobs = () => {
  return dispatch => {
    dispatch(fetchingJobs());
    return fetch(API.jobs)
      .then(response => response.json())
      .then(jobs => dispatch(fetchedJobs(jobs)))
      .catch(err => dispatch(oopsJobs(err)));
  };
};

export const fetchingItem = (type, id) => ({
  type,
  id
});

export const fetchedItem = (type, item) => ({
  type,
  item
});

export const oopsItem = (type, error, id) => ({
  type,
  error,
  id
});

export const fetchItem = (type, id) => {
  const fetchedType = Fetched[type.split("_")[1]];
  const oopsType = Oops[type.split("_")[1]];
  return dispatch => {
    dispatch(fetchingItem(type, id));
    return fetch(API.item(id))
      .then(response => response.json())
      .then(item => dispatch(fetchedItem(fetchedType, item)))
      .catch(err => dispatch(oopsItem(oopsType, err, id)));
  };
};
