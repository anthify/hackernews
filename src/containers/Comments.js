import React, { Component } from "react";
import { fetchItem } from "../actions/";
import { Fetching, Colors } from "../constants/";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import Comment from "../components/Comment";

const StoryTitle = styled.div`
  width: 100%;
  height: auto;
  background: ${Colors.primary};
  color: ${Colors.light};
  padding: 0px 0px 20px 0px;
  h1 {
    padding: 20px;
    margin: 0;
    font-size: 28px;
  }
  h3 {
    padding-left: 20px;
    margin: 0;
    font-size: 14px;
  }
  a {
    background: ${Colors.light};
    padding: 10px 10px;
    border-radius: 5px;
    color: ${Colors.dark};
    font-weight: bold;
    text-decoration: none;
    margin: 20px 20px 0px;
    display: block;
    text-align: center;
  }
`;

const CommentsWrapper = styled.div`
  background: ${Colors.light};
  padding: 20px;
`;

class Comments extends Component {
  componentWillMount() {
    const { stories } = this.props.stories;
    const { id } = this.props.match.params;
    const story = stories[id];
    if (!story) {
      this.props.dispatch(fetchItem(Fetching.STORY, id));
    }
    const { comment } = this.props.match.params;
    if (comment) {
      this.getCommentAndReplies(comment);
    }
  }

  renderLoader() {
    return <div>Loading...</div>;
  }

  fetchComment(id) {
    const { comments } = this.props.stories;
    if (!comments[id]) {
      this.props.dispatch(fetchItem(Fetching.COMMENT, id));
    }
  }

  handleGoToReplies(id) {
    this.props.history.push(id);
  }

  renderComments(kids, id, storyId) {
    const { comments } = this.props.stories;
    if (id) {
      if (comments[id].fetching) {
        return this.renderLoader();
      }
    }
    const commentData = id ? [parseInt(id), ...comments[id].kids] : kids;
    return (
      <CommentsWrapper>
        {commentData.map(i => {
          return (
            <Comment
              key={i}
              parentComment={id}
              replies={this.handleGoToReplies.bind(this)}
              storyId={storyId}
              commentId={i}
              fetch={this.fetchComment.bind(this)}
              {...this.props.stories.comments}
            />
          );
        })}
      </CommentsWrapper>
    )
  }

  getCommentAndReplies(commentId) {
    const { comments } = this.props.stories;
    if (!comments[commentId]) {
      this.fetchComment(commentId);
    }
  }

  render() {
    const { stories, comments } = this.props.stories;
    const { id, comment } = this.props.match.params;
    const story = stories[id];
    if (!story) {
      return this.renderLoader();
    }
    return (
      <div>
        <StoryTitle>
          <h1>
            {story.title}
          </h1>
          <h3>
            by {story.by} {moment.unix(story.time).startOf("hour").fromNow()}
          </h3>
          <a href={story.url} target="_blank">Go to story</a>
        </StoryTitle>
        { story.descendants ? this.renderComments(story.kids, comment, id) : <div>No comments...</div> }
      </div>
    )
  }
}

export default connect(state => state)(Comments);
