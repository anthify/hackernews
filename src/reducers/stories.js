import { Fetching, Fetched, Oops } from "../constants/";

export const initialState = {
  storyIds: [],
  jobIds: [],
  storyIdsError: false,
  fetchingStories: false,
  fetchingJobs: false,
  jobIdsError: false,
  stories: {},
  comments: {},
  jobs: {}
};

const stories = (state = initialState, action = {}) => {
  switch (action.type) {
    case Fetching.NEWS: {
      return Object.assign({}, state, {
        fetchingStories: true,
        storyIdsError: false
      });
    }
    case Fetched.NEWS: {
      return Object.assign({}, state, {
        storyIds: action.news,
        fetchingStories: false
      });
    }
    case Oops.NEWS: {
      return Object.assign({}, state, {
        storyIdsError: true
      });
    }
    case Fetching.STORY: {
      return Object.assign({}, state, {
        stories: {
          [action.id]: {
            fetching: true,
            error: false
          },
          ...state.stories
        }
      });
    }
    case Fetched.STORY: {
      return Object.assign({}, state, {
        stories: {
          [action.item.id]: {
            fetching: false,
            ...action.item
          },
          ...state.stories
        }
      });
    }
    case Oops.STORY: {
      return Object.assign({}, state, {
        stories: {
          [action.id]: {
            error: true,
            fetching: false
          }
        },
        ...state.stories
      });
    }
    case Fetching.COMMENT: {
      return Object.assign({}, state, {
        comments: {
          [action.id]: {
            fetching: true,
            error: false
          },
          ...state.comments
        }
      });
    }
    case Fetched.COMMENT: {
      return Object.assign({}, state, {
        comments: {
          [action.item.id]: {
            fetching: false,
            ...action.item
          },
          ...state.comments
        }
      });
    }
    case Oops.COMMENT: {
      return Object.assign({}, state, {
        comments: {
          [action.id]: {
            error: true,
            fetching: false
          }
        },
        ...state.comments
      });
    }
    case Fetching.JOBS: {
      return Object.assign({}, state, {
        fetchingJobs: true,
        jobIdsError: false
      });
    }
    case Fetched.JOBS: {
      return Object.assign({}, state, {
        jobIds: action.jobs,
        fetchingJobs: false
      });
    }
    case Oops.JOBS: {
      return Object.assign({}, state, {
        jobIdsError: true
      });
    }
    case Fetching.JOB: {
      return Object.assign({}, state, {
        jobs: {
          [action.id]: {
            fetching: true,
            error: false
          },
          ...state.jobs
        }
      });
    }
    case Fetched.JOB: {
      return Object.assign({}, state, {
        jobs: {
          [action.item.id]: {
            fetching: false,
            ...action.item
          },
          ...state.jobs
        }
      });
    }
    case Oops.JOB: {
      return Object.assign({}, state, {
        jobs: {
          [action.id]: {
            error: true,
            fetching: false
          }
        },
        ...state.jobs
      });
    }
    default: {
      return state;
    }
  }
};

export default stories;
