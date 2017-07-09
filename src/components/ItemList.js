import React from "react";
import styled from "styled-components";
import Item from "./Item";

const ItemListWrapper = styled.div`
  background: white;
  padding: 10px;
`;

export const ItemList = props => {
  return (
    <ItemListWrapper>
      {props.stories.visibleStories.map(i => {
        return (
          <Item key={i} id={i} fetchStory={props.fetchStory} story={props.stories.stories[i]} />
        )
      })}
    </ItemListWrapper>
  );
};
