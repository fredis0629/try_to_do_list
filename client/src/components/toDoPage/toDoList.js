import React from "react";
import TableLine from "./tableLine";

class ToDoList extends React.Component {
  componentDidMount() {
    this.props.getToDoList();
  }
  render() {
    return (
      <div className="content">
        <table>
          <tbody>{this.props.data && this.props.data.map(item => <TableLine key={JSON.stringify(item)} item={item} />)}</tbody>
        </table>
      </div>
    );
  }
}

export default ToDoList;
