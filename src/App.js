import React, {Component} from 'react'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  state = {
    addTask: "",
    addDeadline: "",
    givenTasks: [],
    givenDeadlines: [],
    archivedTasks: [],
    archiveStatus: false,
    time: new Date()
  }

  /*added a digital date and clock */
  componentDidMount() { 
    this.update = setInterval(() => {
        this.setState({ time: new Date() });
    }, 1 * 1000);
  }

  componentWillUnmount() { 
    clearInterval(this.update);
  }

  /*added tasks with a deadline input*/
  addTaskHandler = (event) => {
    this.setState({
      addTask: event.target.value
    })
  }
  
  deadlineHandler = (event) => {
    this.setState({
      addDeadline: event.target.value
    })
  }

  listTasksHandler = (task, deadline) => {
    this.setState ({
      givenTasks: [...this.state.givenTasks, this.state.addTask],
      addTask: "",
      givenDeadlines: [...this.state.givenDeadlines, this.state.addDeadline],
      addDeadline: ""
    })
  }

  /*create a archived tasks area ---- not working yet*/  
  showArchivedHandler = () => {
    const doesShow = this.state.archiveStatus;
    this.setState({
      archiveStatus: !doesShow
    })
  }

  archivedTasksHandler = (archTaskIndex) => {
      const archivedTasks = [...this.state.archivedTasks];
      const archDate = this.state.curTime;
      archivedTasks.unshift(archTaskIndex, 1);
      this.setState({
        archivedTasks: archivedTasks,
        archDate: archDate
    })
  }
  
  /* delete saved tasks*/  

  deleteTaskHandler = (taskIndex) => {
    const deletedTasks = [...this.state.givenTasks];
    deletedTasks.splice(taskIndex, 1);
    this.setState({
      givenTasks: deletedTasks
    });
  }

  render () {

    const time = this.state.time

    let eachDeadline = this.state.givenDeadlines.map((deadline, index) => {
      return <span key = {index} className="givenDeadlines" > {deadline} </span>
    })

    let eachTask = this.state.givenTasks.map((task, index) =>{
      return <li key = {index} ><h2 className="givenTasks"> {task} {eachDeadline}</h2>
        <button onClick={this.archivedTasksHandler} onClick>Done</button>
        <button onClick={() => this.deleteTaskHandler(index)}>Delete</button>
      </li>
    })

    let eachArcTasks = this.state.archivedTasks.map((archTask, index) => {
      return <li key = {index} ><h2 className="oldTasks"> {archTask}</h2>
      <button onClick={() => this.archivedTasksHandler(index)}>Done</button>
      <button onClick={() => this.deleteTaskHandler(index)}>Delete</button>
      </li>
    })

    return (
      <div className="App">

        <div className="appInfo">

          <div className="clock">
            {time.toLocaleString()}
          </div>

          <div className="titleArea">
            <h1>Like every other to-do-list</h1>
            <p>Add task and the deadline for them</p>
          </div>
          
          <div className="inputArea">
              <input className="taskInput input" type="text" 
              onChange={this.addTaskHandler} placeHolder="Add your Task"
              value={this.state.addTask}></input>
              <label for="deadline">Deadline: </label>
              <input className="deadlineInput input" name="deadline" 
              type="date" value="2018-07-22" onChange={this.deadlineHandler} 
              placeHolder="When should you finish the task?"
              value={this.state.addDeadline}></input>
              <div>
                <button className="saveBtn" onClick={this.listTasksHandler}>
                  Add to List</button>
              </div>
          </div>
        </div>

        <div className="addedTasksArea">
          <h1>Your Tasks</h1>
          <div className="addedTaskArea">
            <ul className="addedTask">{eachTask}</ul>
          </div>
        </div>

        <div className="archivedArea">
            <h2>Archived Tasks</h2>
            <ul className="archivedTasks">{eachArcTasks}</ul>
        </div>

      </div>
  )}
}

export default App;
