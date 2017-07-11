import React from "react";
import styled from "styled-components";
import Item from "./Item";
import { Colors } from "../constants";

const ItemListWrapper = styled.div`
  background: ${Colors.light};
  padding: 10px;
`;

export const ItemList = props => {
  return (
    <ItemListWrapper>
      {props.stories.visibleStories.map(i => {
        return (
          <Item key={i} id={i} fetchStory={props.fetchStory} push={props.push} story={props.stories.stories[i]} />
        )
      })}
    </ItemListWrapper>
  );
};
