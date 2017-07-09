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
    return (
      this.props.stories.visibleStories.length ===
      this.props.stories.storyIds.length
    );
  }

  displayStories() {
    const { dispatch } = this.props;
    if (this.moreStories()) {
      return;
    }
    dispatch(addVisibleStories());
  }

  fetchStory(id) {
    const { dispatch } = this.props;
    dispatch(fetchItem(Fetching.STORY, id));
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.displayStories.bind(this)}
        hasMore={!this.moreStories()}
        loader={<div className="loader">Loading ...</div>}
        useWindow={false}
      >
        <ItemList {...this.props} fetchStory={this.fetchStory.bind(this)} />
      </InfiniteScroll>
    )
  }
}

export default connect(state => state)(Stories);
