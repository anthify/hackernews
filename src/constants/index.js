export const Fetching = {
  NEWS: "FETCHING_NEWS",
  STORY: "FETCHING_STORY",
  COMMENT: "FETCHING_COMMENT",
  JOB: "FETCHING_JOB",
  JOBS: "FETCHING_JOBS"
};

export const Fetched = {
  NEWS: "FETCHED_NEWS",
  STORY: "FETCHED_STORY",
  COMMENT: "FETCHED_COMMENT",
  JOB: "FETCHED_JOB",
  JOBS: "FETCHED_JOBS"
};

export const Oops = {
  NEWS: "OOPS_NEWS",
  STORY: "OOPS_STORY",
  COMMENT: "OOPS_COMMENT",
  JOB: "OOPS_JOB",
  JOBS: "OOPS_JOBS"
};

export const API = {
  news: "https://hacker-news.firebaseio.com/v0/topstories.json",
  jobs: "https://hacker-news.firebaseio.com/v0/jobstories.json",
  item: id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
};
