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
    data: [],
    form: {
      name: "",
      task: "",
      date: ""
    }
  };

  submitForm = event => {
    event.preventDefault();
    fetch(`${this.state.serverUrl}toDoList/addTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(this.state.form)
    })
      .then(res => {
        if (res.status !== 200) throw new Error(res.status);
        return res.json();
      })
      .then(arr => this.setState({ data: arr, form: { name: "", task: "", date: "" } }))
      .catch(e => console.log(e));
  };

  getToDoList = () => {
    fetch(`${this.state.serverUrl}toDoList`)
      .then(res => res.json())
      .then(arr => this.setState({ data: arr }))
      .catch(e => console.log(e));
  };
  changeName = e => {
    const tmp = e.target.value;
    this.setState(cur => ({
      form: {
        name: tmp,
        task: cur.form.task,
        date: cur.form.date
      }
    }));
  };
  changeTask = e => {
    const tmp = e.target.value;
    this.setState(cur => ({
      form: {
        name: cur.form.name,
        task: tmp,
        date: cur.form.date
      }
    }));
  };
  changeDate = e => {
    const tmp = e.target.value;
    this.setState(cur => ({
      form: {
        name: cur.form.name,
        task: cur.form.task,
        date: tmp
      }
    }));
  };
  updateTask = (id, operation, index) => {
    fetch(`${this.state.serverUrl}toDoList/update/${id}/${operation}`, {
      method: "PATCH"
    })
      .then(() => {
        this.setState(cur => (cur.data[index][operation] = !cur.data[index][operation]));
      })
      .catch(e => console.log(e));
  };
  deleteTask = id => {
    fetch(`${this.state.serverUrl}toDoList/delete/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        this.setState(cur => {
          return { data: cur.data.filter(obj => obj.id !== id) };
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <DivConteiner>
        <FormToAddTask
          submitForm={this.submitForm}
          form={this.state.form}
          changeDate={this.changeDate}
          changeName={this.changeName}
          changeTask={this.changeTask}
        />
        <ToDoList getToDoList={this.getToDoList} data={this.state.data} updateTask={this.updateTask} deleteTask={this.deleteTask} />
      </DivConteiner>
    );
  }
}

export default ToDoPage;
