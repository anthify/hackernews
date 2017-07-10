import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Colors } from "../constants";

const HeaderWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${Colors.hackernews};
  box-shadow: 1px 2px 23px 0px rgba(46, 61, 73, 0.2);
  h1 {
    font-size: 30px;
    color: ${Colors.light};
    margin: 0;
    text-align: center;
    text-shadow: 0px 3px 10px rgba(116, 69, 0, 0.2);
  }
`;

class Header extends Component {

  render() {
      console.log(this);
    return (
      <HeaderWrapper onClick={() => this.props.history.push("/")}>
        <h1>HackerNews</h1>
      </HeaderWrapper>
    )
  }
};

export default connect(state => state)(Header);
