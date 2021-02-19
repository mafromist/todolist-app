import React, {Component} from 'react'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  state = {
    addTask: "",
    addDeadline: "",
    givenTasks: [],
    givenDeadlines: [],
    finishedTasks: [],
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

  /*create a finished tasks area ---- not working yet*/  
  showFinishedHandler = () => {
    const doesShow = this.state.archiveStatus;
    this.setState({
      archiveStatus: !doesShow
    })
  }

  finishedTasksHandler = (archTaskIndex) => {
      const finishedTasks = [...this.state.givenTasks, this.state.finishedTasks];
      const archDate = this.state.curTime;
      finishedTasks.unshift(archTaskIndex, 1);
      this.setState({
        finishedTasks: finishedTasks,
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
      return <li key = {index} className="givenTasks"><p> {task} <span className="deadlineTitle">deadline: {eachDeadline}</span></p>
        <button className="doneBtn " onClick={this.finishedTasksHandler} onClick>Done</button>
        <button className="deleteBtn" onClick={() => this.deleteTaskHandler(index)}>Delete</button>
      </li>
    })

    let eachArcTasks = this.state.finishedTasks.map((archTask, index) => {
      return <li key = {index} className="archTasks"><p className="oldTasks"> {archTask}{time}</p>
      <button className="doneBtn" onClick={() => this.finishedTasksHandler(index)}>Done</button>
      <button className="deleteBtn" onClick={() => this.deleteTaskHandler(index)}>Delete</button>
      </li>
    })

    return (
      <div className="App">
        <div className="upCont">
          <div className="appCont">

            <div className="titleArea">
              <h1>Like every other to-do-list</h1>
              <p>Add task and the deadline for them</p>
            </div>
            
            <div className="appInfo">
              <div className="inputArea">
                <div>
                  <label for="task">Your Task:</label>
                  <input className="taskInput input" type="text" 
                  onChange={this.addTaskHandler} placeHolder="Add your Task here"
                  value={this.state.addTask} name="task"></input>
                  </div>
                  <div>
                  <label for="deadline">When should you finish the task? </label>
                  <input className="deadlineInput input" name="deadline" 
                  type="date" value="2018-07-22" onChange={this.deadlineHandler} 
                  value={this.state.addDeadline}></input>
                </div>
              </div>
              <div>
                  <button className="saveBtn" onClick={this.listTasksHandler}>
                    Add to List</button>
              </div>
            </div>
          </div>

          <div className="taskArea">
            <div className="addedTasksArea">
              <h1>Your Tasks</h1>
              <div className="addedTaskArea">
                <ul className="addedTask">{eachTask}</ul>
              </div>
            </div>

            <div className="finishedArea">
                <h2>finished Tasks</h2>
                <ul className="finishedTasks">{eachArcTasks}</ul>
            </div>
          </div>
        </div>
        <div className="clock">
            {time.toLocaleString()}
        </div>

      </div>
  )}
}

export default App;
