import { Fetching, Fetched, Oops, UI } from "../constants/";

export const initialState = {
  visibleStories: [],
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
          ...state.stories,
          [action.id]: {
            fetching: true,
            error: false
          }
        }
      });
    }
    case Fetched.STORY: {
      return Object.assign({}, state, {
        stories: {
          ...state.stories,
          [action.item.id]: {
            ...action.item,
            fetching: false
          }
        }
      });
    }
    case Oops.STORY: {
      return Object.assign({}, state, {
        stories: {
          ...state.stories,
          [action.id]: {
            error: true,
            fetching: false
          }
        }
      });
    }
    case Fetching.COMMENT: {
      return Object.assign({}, state, {
        comments: {
          ...state.comments,
          [action.id]: {
            fetching: true,
            error: false
          }
        }
      });
    }
    case Fetched.COMMENT: {
      return Object.assign({}, state, {
        comments: {
          ...state.comments,
          [action.item.id]: {
            ...action.item,
            fetching: false,
          }
        }
      });
    }
    case Oops.COMMENT: {
      return Object.assign({}, state, {
        comments: {
          ...state.comments,
          [action.id]: {
            error: true,
            fetching: false
          }
        }
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
          ...state.jobs,
          [action.id]: {
            fetching: true,
            error: false
          }
        }
      });
    }
    case Fetched.JOB: {
      return Object.assign({}, state, {
        jobs: {
          ...state.jobs,
          [action.item.id]: {
            ...action.item,
            fetching: false
          }
        }
      });
    }
    case Oops.JOB: {
      return Object.assign({}, state, {
        jobs: {
          ...state.jobs,
          [action.id]: {
            error: true,
            fetching: false
          }
        }
      });
    }
    case UI.ADD_VISIBLE_STORIES: {
      return Object.assign({}, state, {
        visibleStories: [
          ...state.visibleStories,
          state.storyIds[state.visibleStories.length]
        ]
      });
    }
    default: {
      return state;
    }
  }
};

export default stories;
