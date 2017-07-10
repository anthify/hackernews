import React, { Component } from "react";
import { Colors } from "../constants";
import styled from "styled-components";

const CommentWrapper = styled.div`
  color: ${Colors.title};
  h2 {
    color: ${Colors.dark};
    font-size: 18px;
  }
  p {
    color: ${Colors.dark};
    font-size: 14px;
    line-height: 20px;
    word-wrap: break-word;
    a {
      color: ${Colors.action};
    }
  }
`;

const ReplyButtonWrapper = styled.div`
  background: ${Colors.action};
  border-radius: 5px;
  display: inline-block;
  padding: 6px 14px;
  cursor: pointer;
  p {
    color: ${Colors.light};
    margin: 0;
    font-weight: bold;
    font-size: 12px;
  }
`;

const Divider = styled.div`border-bottom: 4px solid ${Colors.action};`;

class Comment extends Component {
  componentDidMount() {
    this.props.fetch(this.props.commentId);
  }

  renderRepliesButton(comment, storyId, parentComment) {
    if (comment.id == parentComment) {
      return <Divider />;
    }
    return (
      <ReplyButtonWrapper onClick={() => this.props.replies(`/comments/${storyId}/${comment.id}`)}>
        <p>
          {comment.kids.length === 1 ? `${comment.kids.length} reply` : `${comment.kids.length} replies`}
        </p>
      </ReplyButtonWrapper>
    );
  }

  render() {
    const comment = this.props[this.props.commentId];
    const { storyId, parentComment } = this.props;
    if (!comment) {
      return <div>Loading...</div>
    }
    return (
      <CommentWrapper>
        <h2>{comment.by}</h2>
        <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
        { comment.kids ? this.renderRepliesButton(comment, storyId, parentComment) : null }
      </CommentWrapper>
    )
  }
}

export default Comment;
