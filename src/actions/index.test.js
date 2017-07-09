import * as actions from "./index";
import { Fetching, Fetched, Oops } from "../constants/";

import { topStoriesData, mockedError } from "../../spec/mock_data";

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
      mockRes(200, topStoriesData);
      return store.dispatch(actions.fetchNews()).then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({ type: Fetching.NEWS });
        expect(expectedActions).toContainEqual({
          type: Fetched.NEWS,
          news: topStoriesData
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
