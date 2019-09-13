import React from "react";
import FormToAddTask from "../../components/toDoPage/formToAddTask";
import ToDoList from "../../components/toDoPage/toDoList";
import styled from "styled-components";

const DivConteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-content: center;
`;

class ToDoPage extends React.Component {
  state = {
    serverUrl: `http://${window.location.hostname}:9000/`,
    data: []
  };

  submitForm = event => {
    event.preventDefault();
    const ajaxPostRequestSubmit = window.ajaxPost;
    let task = {};
    for (let index = 0; index < ajaxPostRequestSubmit.length - 1; index++) {
      task[ajaxPostRequestSubmit[index].name] = ajaxPostRequestSubmit[index].value;
    }
    fetch(`${this.state.serverUrl}addTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(arr => this.setState({ data: arr }));
  };

  getToDoList = () => {
    fetch(`${this.state.serverUrl}ajaxGetRequest`)
      .then(res => res.json())
      .then(arr => this.setState({ data: arr }));
  };

  render() {
    return (
      <DivConteiner>
        <FormToAddTask submitForm={this.submitForm} />
        <ToDoList getToDoList={this.getToDoList} data={this.state.data} />
      </DivConteiner>
    );
  }
}

export default ToDoPage;
