import React, { Component } from "react";
import { Colors } from "../constants";
import { Loader } from "../components/Loader";
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

const BackButton = styled.div`
  background: ${Colors.dark};
  border-radius: 5px;
  display: inline-block;
  padding: 6px 14px;
  cursor: pointer;
  color: ${Colors.light};
  margin: 0;
  font-weight: bold;
  font-size: 12px;
`;

const Divider = styled.div`border-bottom: 4px solid ${Colors.action};`;

class Comment extends Component {
  componentDidMount() {
    this.props.fetch(this.props.commentId);
  }

  stepBackToParent(path) {
    this.props.replies(path);
  }

  backButtonHandler(comment, storyId) {
    if (comment.parent == storyId) {
      this.stepBackToParent(`/comments/${storyId}`)
    } else {
      this.stepBackToParent(`/comments/${storyId}/${comment.parent}`)
    }
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
      return <Loader />
    }
    return (
      <CommentWrapper>
        { comment.id == parentComment && parentComment ? <BackButton onClick={() => this.backButtonHandler(comment, storyId)}>Back</BackButton> : null }
        <h2>{comment.by}</h2>
        <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
        { comment.kids ? this.renderRepliesButton(comment, storyId, parentComment) : null }
      </CommentWrapper>
    )
  }
}

export default Comment;
