import React from "react";
import styled, { keyframes } from "styled-components";
import { Colors } from "../constants";


const Grow = keyframes`
  0%, 100%{
    -webkit-transform: scaleY(1);
    -ms-transform: scaleY(1);
    -o-transform: scaleY(1);
    transform: scaleY(1);
  }
  50%{
    -webkit-transform: scaleY(1.8);
    -ms-transform: scaleY(1.8);
    -o-transform: scaleY(1.8);
    transform: scaleY(1.8);
  }
`;

const LoaderSequence = styled.div`
  width: 44px;
  height: 20px;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  transition: opacity .3s ease;
  span {
    border-radius: 10px;
    display: inline-block;
    width: 5px;
    margin: 3px;
    height: 20px;
    background-color: ${Colors.hackernews};
  }
  span:nth-child(1) {
    animation: ${Grow} 1s ease-in-out infinite;
  }
  span:nth-child(2){
    animation: ${Grow} 1s ease-in-out 0.15s infinite;
  }
  span:nth-child(3){
    animation: ${Grow} 1s ease-in-out 0.30s infinite;
  }
  span:nth-child(4){
    animation: ${Grow} 1s ease-in-out 0.45s infinite;
  }
`;

const LoaderWrapper = styled.div`
  min-height: 100px;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderSequence>
        <span />
        <span />
        <span />
        <span />
      </LoaderSequence>
    </LoaderWrapper>
  );
};
