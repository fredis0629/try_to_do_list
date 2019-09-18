import React from "react";
import styled from "styled-components";

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  width: min-content;
  border: 2px solid black;
  margin: 10px auto;
  border-radius: 20%;
  padding: 15px;
`;
const StyledP = styled.p`
  font-weight: bold;
`;
const SubmitInput = styled.input`
  width: 100px;
  height: 30px;
  margin: auto auto 0 auto;
  color: white;
  background-color: #000;
  &:hover {
    cursor: cell;
  }
`;

class FormToAddTask extends React.Component {
  render() {
    return (
      <PostForm action="/addTask" method="post" id="ajaxPost" onSubmit={this.props.submitForm}>
        <StyledP>Add Task</StyledP>
        Name: <input type="text" name="name" value={this.props.form.name} onChange={this.props.changeName} />
        <br />
        Task: <input type="text" name="task" value={this.props.form.task} onChange={this.props.changeTask} />
        <br />
        Date: <input type="date" name="date" value={this.props.form.date} onChange={this.props.changeDate} />
        <br />
        <SubmitInput type="submit" value="Submit" />
      </PostForm>
    );
  }
}

export default FormToAddTask;
