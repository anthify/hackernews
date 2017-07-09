import * as actions from "./index";
import { Fetching, Fetched } from "../constants/";

import { topStoriesData } from "../../spec/mock_data";

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

const mockRes = (status, data) => {
  window.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(mockResponse(status, null, JSON.stringify(data)))
    );
};

describe("News", () => {
  describe("Fetch news", () => {
    it("It fetches array of news ids", () => {
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
  });
});
