import * as actions from "./index";
import { Fetching, Fetched, Oops } from "../constants/";

import {
  mockIdsData,
  mockedError,
  mockedStory,
  mockedComment,
  mockedJob
} from "../../spec/mock_data";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      "Content-type": "application/json"
    }
  });
};

const mockRes = (status, data, error) => {
  window.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(mockResponse(status, null, JSON.stringify(data)))
    );
};

const mockError = err => {
  window.fetch = jest.fn().mockImplementation(() => Promise.reject(err));
};

describe("News", () => {
  describe("Fetch news", () => {
    it("fetches array of news ids", () => {
      const store = mockStore();
      mockRes(200, mockIdsData);
      return store.dispatch(actions.fetchNews()).then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({ type: Fetching.NEWS });
        expect(expectedActions).toContainEqual({
          type: Fetched.NEWS,
          news: mockIdsData
        });
      });
    });

    it("returns error", () => {
      const store = mockStore();
      mockError(mockedError);
      return store.dispatch(actions.fetchNews()).then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({ type: Fetching.NEWS });
        expect(expectedActions).toContainEqual({
          type: Oops.NEWS,
          error: mockedError
        });
      });
    });
  });
});

describe("Story", () => {
  describe("Fetch story", () => {
    it("fetches story", () => {
      const store = mockStore();
      mockRes(200, mockedStory);
      return store
        .dispatch(actions.fetchItem(Fetching.STORY, "id"))
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toBe(2);
          expect(expectedActions).toContainEqual({
            type: Fetching.STORY,
            id: "id"
          });
          expect(expectedActions).toContainEqual({
            type: Fetched.STORY,
            item: mockedStory
          });
        });
    });

    it("returns error", () => {
      const store = mockStore();
      mockError(mockedError);
      return store
        .dispatch(actions.fetchItem(Fetching.STORY, "id"))
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toBe(2);
          expect(expectedActions).toContainEqual({
            type: Fetching.STORY,
            id: "id"
          });
          expect(expectedActions).toContainEqual({
            type: Oops.STORY,
            error: mockedError,
            id: "id"
          });
        });
    });
  });
});

describe("Comment", () => {
  describe("Fetch comment", () => {
    it("fetches comment", () => {
      const store = mockStore();
      mockRes(200, mockedComment);
      return store
        .dispatch(actions.fetchItem(Fetching.COMMENT, "id"))
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toBe(2);
          expect(expectedActions).toContainEqual({
            type: Fetching.COMMENT,
            id: "id"
          });
          expect(expectedActions).toContainEqual({
            type: Fetched.COMMENT,
            item: mockedComment
          });
        });
    });

    it("returns error", () => {
      const store = mockStore();
      mockError(mockedError);
      return store
        .dispatch(actions.fetchItem(Fetching.COMMENT, "id"))
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toBe(2);
          expect(expectedActions).toContainEqual({
            type: Fetching.COMMENT,
            id: "id"
          });
          expect(expectedActions).toContainEqual({
            type: Oops.COMMENT,
            error: mockedError,
            id: "id",
          });
        });
    });
  });
});

describe("Jobs", () => {
  describe("Fetch Jobs", () => {
    it("fetches array of job ids", () => {
      const store = mockStore();
      mockRes(200, mockIdsData);
      return store.dispatch(actions.fetchJobs()).then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({ type: Fetching.JOBS });
        expect(expectedActions).toContainEqual({
          type: Fetched.JOBS,
          jobs: mockIdsData
        });
      });
    });

    it("returns error", () => {
      const store = mockStore();
      mockError(mockedError);
      return store.dispatch(actions.fetchJobs()).then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({ type: Fetching.JOBS });
        expect(expectedActions).toContainEqual({
          type: Oops.JOBS,
          error: mockedError
        });
      });
    });
  });
});

describe("Job", () => {
  describe("Fetch job", () => {
    it("fetches job", () => {
      const store = mockStore();
      mockRes(200, mockedJob);
      return store.dispatch(actions.fetchItem(Fetching.JOB, "id"))
        .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({
          type: Fetching.JOB,
          id: "id"
        });
        expect(expectedActions).toContainEqual({
          type: Fetched.JOB,
          item: mockedJob
        });
      });
    });

    it("returns error", () => {
      const store = mockStore();
      mockError(mockedError);
      return store.dispatch(actions.fetchItem(Fetching.JOB, "id"))
        .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({
          type: Fetching.JOB,
          id: "id"
        });
        expect(expectedActions).toContainEqual({
          type: Oops.JOB,
          error: mockedError,
          id: "id"
        });
      });
    });
  });
});
