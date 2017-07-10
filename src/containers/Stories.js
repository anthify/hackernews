import React, { Component } from "react";
import { fetchNews, addVisibleStories, fetchItem } from "../actions/";
import { Fetching } from "../constants/";
import { connect } from "react-redux";
import { ItemList } from "../components/ItemList";
import InfiniteScroll from "react-infinite-scroller";

class Stories extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    if (this.props.stories.storyIds.length < 1) {
      dispatch(fetchNews());
    }
  }

  moreStories() {
    const { visibleStories, stories } = this.props.stories;
    const lastStory = stories[visibleStories[visibleStories.length - 1]] || {};
    if (lastStory.fetching) {
      return false;
    }
    return true;
  }

  displayStories() {
    const { dispatch } = this.props;
    if (this.moreStories()) {
      dispatch(addVisibleStories());
    }
  }

  fetchStory(id) {
    const { dispatch } = this.props;
    dispatch(fetchItem(Fetching.STORY, id));
  }

  pushHandler(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <InfiniteScroll
        initialLoad={(this.props.stories.storyIds.length > 1)}
        pageStart={10}
        loadMore={this.displayStories.bind(this)}
        hasMore={this.moreStories()}
        loader={<div className="loader">Loading ...</div>}
        useWindow={false}
      >
        <ItemList {...this.props} push={this.pushHandler.bind(this)} fetchStory={this.fetchStory.bind(this)} />
      </InfiniteScroll>
    )
  }
}

export default connect(state => state)(Stories);
