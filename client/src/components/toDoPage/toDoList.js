import React from "react";
import TableLine from "./tableLine";
import styled from "styled-components";

const TableCom = styled.table`
  border-collapse: collapse;
`;

class ToDoList extends React.Component {
  componentDidMount() {
    this.props.getToDoList();
  }
  render() {
    return (
      <div className="content">
        <TableCom>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Task</th>
              <th>Till</th>
            </tr>
            {this.props.data &&
              this.props.data.map((item, index) => (
                <TableLine key={JSON.stringify(item)} item={item} index={index} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />
              ))}
          </tbody>
        </TableCom>
      </div>
    );
  }
}

export default ToDoList;
