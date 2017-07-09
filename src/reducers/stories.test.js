import stories, { initialState } from "./stories";
import { Fetching, Fetched, Oops } from "../constants/";
import {
  mockIdsData,
  mockedStory,
  mockedComment,
  mockedJob
} from "../../spec/mock_data";

describe("Stories Reducer", () => {
  it("returns initialState when type is not set", () => {
    const reducer = stories();
    expect(reducer).toEqual(initialState);
  });

  it("returns fetchingStories as true", () => {
    const action = {
      type: Fetching.NEWS
    };
    const expectedState = Object.assign({}, initialState, {
      fetchingStories: true
    });
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("set storyIds to state", () => {
    const action = {
      type: Fetched.NEWS,
      news: mockIdsData
    };
    const expectedState = Object.assign({}, initialState, {
      storyIds: mockIdsData,
      fetchingStories: false
    });
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("set storyIdError to true", () => {
    const action = {
      type: Oops.NEWS
    };
    const expectedState = Object.assign({}, initialState, {
      storyIdsError: true
    });
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("sets fetching status as true on incoming story", () => {
    const expectedState = Object.assign({}, initialState, {
      stories: {
        [mockedStory.id]: {
          fetching: true,
          error: false
        }
      }
    });
    const action = {
      type: Fetching.STORY,
      id: mockedStory.id
    };
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("sets fetching status as false and adds story object", () => {
    const expectedState = Object.assign({}, initialState, {
      stories: {
        [mockedStory.id]: {
          fetching: false,
          ...mockedStory
        }
      }
    });
    const action = {
      type: Fetched.STORY,
      item: mockedStory
    };
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("add incoming story item to stories object", () => {
    const state = Object.assign({}, initialState, {
      stories: {
        "1234": {
          fetching: false,
          otherProps: "andValues"
        }
      }
    });
    const expectedState = Object.assign({}, initialState, {
      stories: {
        "1234": {
          fetching: false,
          otherProps: "andValues"
        },
        [mockedStory.id]: {
          fetching: false,
          ...mockedStory
        }
      }
    });
    const action = {
      type: Fetched.STORY,
      item: mockedStory
    };
    const reducer = stories(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it("set error status to true", () => {
    const expectedState = Object.assign({}, initialState, {
      stories: {
        [mockedStory.id]: {
          fetching: false,
          error: true
        }
      }
    });
    const action = {
      type: Oops.STORY,
      error: "error",
      id: mockedStory.id
    };
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("sets fetching status as true on incoming comment", () => {
    const expectedState = Object.assign({}, initialState, {
      comments: {
        [mockedComment.id]: {
          fetching: true,
          error: false
        }
      }
    });
    const action = {
      type: Fetching.COMMENT,
      id: mockedComment.id
    };
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("sets fetching status as false and adds comment object", () => {
    const expectedState = Object.assign({}, initialState, {
      comments: {
        [mockedComment.id]: {
          fetching: false,
          ...mockedComment
        }
      }
    });
    const action = {
      type: Fetched.COMMENT,
      item: mockedComment
    };
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("add incoming comment item to comments object", () => {
    const state = Object.assign({}, initialState, {
      comments: {
        "1234": {
          fetching: false,
          otherProps: "andValues"
        }
      }
    });
    const expectedState = Object.assign({}, initialState, {
      comments: {
        "1234": {
          fetching: false,
          otherProps: "andValues"
        },
        [mockedComment.id]: {
          fetching: false,
          ...mockedComment
        }
      }
    });
    const action = {
      type: Fetched.COMMENT,
      item: mockedComment
    };
    const reducer = stories(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it("set error status to true", () => {
    const expectedState = Object.assign({}, initialState, {
      comments: {
        [mockedComment.id]: {
          fetching: false,
          error: true
        }
      }
    });
    const action = {
      type: Oops.COMMENT,
      error: "error",
      id: mockedComment.id
    };
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("returns fetchingJobs as true", () => {
    const action = {
      type: Fetching.JOBS
    };
    const expectedState = Object.assign({}, initialState, {
      fetchingJobs: true
    });
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("set jobIds to state", () => {
    const action = {
      type: Fetched.JOBS,
      jobs: mockIdsData
    };
    const expectedState = Object.assign({}, initialState, {
      jobIds: mockIdsData,
      fetchingJobs: false
    });
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("set jobIdError to true", () => {
    const action = {
      type: Oops.JOBS
    };
    const expectedState = Object.assign({}, initialState, {
      jobIdsError: true
    });
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("sets fetching status as true on incoming job", () => {
    const expectedState = Object.assign({}, initialState, {
      jobs: {
        [mockedJob.id]: {
          fetching: true,
          error: false
        }
      }
    });
    const action = {
      type: Fetching.JOB,
      id: mockedJob.id
    };
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("sets fetching status as false and adds job object", () => {
    const expectedState = Object.assign({}, initialState, {
      jobs: {
        [mockedJob.id]: {
          fetching: false,
          ...mockedJob
        }
      }
    });
    const action = {
      type: Fetched.JOB,
      item: mockedJob
    };
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

  it("add incoming job item to jobs object", () => {
    const state = Object.assign({}, initialState, {
      jobs: {
        "1234": {
          fetching: false,
          otherProps: "andValues"
        }
      }
    });
    const expectedState = Object.assign({}, initialState, {
      jobs: {
        "1234": {
          fetching: false,
          otherProps: "andValues"
        },
        [mockedJob.id]: {
          fetching: false,
          ...mockedJob
        }
      }
    });
    const action = {
      type: Fetched.JOB,
      item: mockedJob
    };
    const reducer = stories(state, action);
    expect(reducer).toEqual(expectedState);
  });

  it("set error status to true", () => {
    const expectedState = Object.assign({}, initialState, {
      jobs: {
        [mockedJob.id]: {
          fetching: false,
          error: true
        }
      }
    });
    const action = {
      type: Oops.JOB,
      error: "error",
      id: mockedJob.id
    };
    const reducer = stories(undefined, action);
    expect(reducer).toEqual(expectedState);
  });

});
