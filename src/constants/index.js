export const Fetch = {
  NEWS: "FETCH_NEWS",
  STORY: "FETCH_STORY",
  COMMENT: "FETCH_COMMENT",
  JOB: "FETCH_JOB"
};

export const Fetching = {
  NEWS: "FETCHING_NEWS",
  STORY: "FETCHING_STORY",
  COMMENT: "FETCHING_COMMENT",
  JOB: "FETCHING_JOB"
};

export const Fetched = {
  NEWS: "FETCHED_NEWS",
  STORY: "FETCHED_STORY",
  COMMENT: "FETCHED_COMMENT",
  JOB: "FETCHED_JOB"
};

export const Oops = {
  NEWS: "OOPS_NEWS",
  STORY: "OOPS_STORY",
  COMMENT: "OOPS_COMMENT",
  JOB: "OOPS_JOB"
};

export const API = {
  news: "https://hacker-news.firebaseio.com/v0/topstories.json",
  item: id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
};
