import React from "react";
import styled from "styled-components";

const Line = styled.tr`
  padding: 5px 0;
  border: 2px solid black;
  box-sizing: border-box;
  font-weight: ${props => (props.important ? "bold" : "thin")};
  &:nth-child(even) {
    background-color: ${props => (props.done ? "#0eff00" : "#e0e0e0")};
  }
  background-color: ${props => (props.done ? "#0eff00" : "white")};
  &:hover {
    background-color: green;
  }
`;
const Cell = styled.td`
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 10%;
`;
const ButCell = styled(Cell)`
  padding: 0;
`;
const RequestButton = styled.button`
  border: 0;
  background-color: inherit;
  width: 100%;
  height: 100%;
  min-height: 29px;
  &:hover {
    background-color: #fff;
  }
`;

class TableLine extends React.Component {
  render() {
    return (
      <Line
        important={this.props.item.important}
        done={this.props.item.done}
        onClick={() => this.props.updateTask(this.props.item.id, "important", this.props.index)}
      >
        <Cell>{this.props.item.name}</Cell>
        <Cell>{this.props.item.task}</Cell>
        <Cell>{new Date(this.props.item.date).toLocaleDateString()}</Cell>
        <ButCell>
          <RequestButton
            onClick={e => {
              e.stopPropagation();
              this.props.updateTask(this.props.item.id, "done", this.props.index);
            }}
          >
            Done
          </RequestButton>
        </ButCell>
        <ButCell>
          <RequestButton
            onClick={e => {
              e.stopPropagation();
              this.props.deleteTask(this.props.item.id);
            }}
          >
            Delete
          </RequestButton>
        </ButCell>
      </Line>
    );
  }
}

export default TableLine;
