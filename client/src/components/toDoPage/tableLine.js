import React from "react";
import styled from "styled-components";

const Line = styled.tr`
  height: 100%;
`;

class TableLine extends React.Component {
  render() {
    return (
      <Line>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.task}</td>
        <td>{this.props.item.date}</td>
      </Line>
    );
  }
}

export default TableLine;
