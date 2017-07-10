import React, { Component } from "react";
import styled from "styled-components";
import { Colors } from "../constants";

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
  h1 {
    padding: 20px 10px;
    color: white;
    margin: 0;
    font-size: 18px;
  }
`;

const InfoBar = styled.div`
  background: white;
  padding: 10px;
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
        </Title>
        <InfoBar>
          <span>{ story.score } point </span>
          <span>{ story.descendants === 1 ? `${story.descendants} comment` : `${story.descendants} comments` }</span>
        </InfoBar>
      </div>
    )
  }

  renderLoader() {
    return <p>Loading story... </p>
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
