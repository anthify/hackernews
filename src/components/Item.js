import React, { Component } from "react";
import { Loader } from "./Loader";
import styled from "styled-components";
import { Colors } from "../constants";
import moment from "moment";

const ItemWrapper = styled.div`
  background: ${Colors.light};
  margin: 20px 10px;
  box-shadow: 5px 5px 25px 0px rgba(46, 61, 73, 0.2);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Title = styled.div`
  width: 100%;
  background: ${Colors.primary};
  word-wrap: break-word;
  h1 {
    padding: 20px 10px 10px;
    color: ${Colors.light};
    margin: 0;
    font-size: 18px;
  }
  h3 {
    color: ${Colors.light};
    padding: 10px 10px;
    font-size: 12px;
    margin: 0;
  }
`;

const InfoBar = styled.div`
  background: white;
  padding: 10px;
  span {
    background: ${Colors.action};
    font-size: 14px;
    padding: 5px;
    border-radius: 5px;
    color: ${Colors.light};
    font-weight: bold;
    margin-right: 10px;
  }
`;

class Item extends Component {
  componentDidMount() {
    this.props.fetchStory(this.props.id);
  }

  renderItem() {
    const { story } = this.props;
    return (
      <div>
        <Title>
          <h1>{ story.title }</h1>
          <h3>by {story.by} {moment.unix(story.time).startOf("hour").fromNow()}</h3>
        </Title>
        <InfoBar>
          <span>{ story.score } point </span>
          <span>{ story.descendants === 1 ? `${story.descendants} comment` : `${story.descendants} comments` }</span>
        </InfoBar>
      </div>
    )
  }

  renderLoader() {
    return <Loader />;
  }

  render() {
    if (!this.props.story) {
      return this.renderLoader();
    }
    return (
      <ItemWrapper onClick={() => this.props.push(`/comments/${this.props.id}`)}>
        { this.props.story.fetching ? this.renderLoader() : this.renderItem() }
      </ItemWrapper>
    )
  }
}

export default Item;
