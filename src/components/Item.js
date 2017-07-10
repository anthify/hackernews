import React, { Component } from "react";
import styled from "styled-components";

const ItemWrapper = styled.div`
  background: white;
  margin: 20px 10px;
  box-shadow: 5px 5px 25px 0px rgba(46,61,73,0.2);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
  background: #8db013;
  // padding: 20px;
  h1 {
    padding: 20px 10px;
    color: white;
    margin: 0;
    font-size: 20px;
  }
`;

const InfoBar = styled.div`
  background: white;
  padding: 10px;
`;

class Item extends Component {
  componentWillMount() {
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
          <span>{ story.kids ? story.kids.length : '0' } comments </span>
        </InfoBar>
      </div>
    )
  }

  renderLoader() {
    return <p>Loading story... </p>
  }

  render() {
    console.log(this.props.story);
    if (!this.props.story) {
      return this.renderLoader();
    }
    return (
      <ItemWrapper>
        { this.props.story.fetching ? this.renderLoader() : this.renderItem() }
      </ItemWrapper>
    )
  }
}

export default Item;
