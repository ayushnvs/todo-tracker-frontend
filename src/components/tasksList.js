import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class TasksList extends Component {

  constructor(props) {
    super(props)

    this.deleteTask = this.deleteTask.bind(this)

    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks')
      .then(res => {
        this.setState({
          tasks: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteTask(id) {
    axios.delete('http://localhost:5000/tasks/' + id)
      .then(res => console.log(res.data))

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    })
  }

  render() {
    return (
      <div>
        <h3 className='mt-3'>Logged tasks</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>updates</th>
              <th>category</th>
              <th>Username</th>
              <th>Status</th>
              <th>Prority</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.tasks.map(currentTask => {
                return <tr key={currentTask._id}>
                  <td>{currentTask.name}</td>
                  <td>{currentTask.description}</td>
                  <td>{currentTask.updates.length > 0 ? currentTask.updates.slice(-1)[0] : ''}</td>
                  <td>{currentTask.category}</td>
                  <td>{currentTask.username}</td>
                  <td>{currentTask.status}</td>
                  <td>{currentTask.priority}</td>
                  <td><Link to={"/edit/" + currentTask._id}>edit</Link> | <a style={{display: "none"}} href='' onClick={() => {this.deleteTask(currentTask._id)}}>delete</a></td>
                </tr>
              })
            }
          </tbody>
        </table>
        <button className="btn btn-primary">Add New Task</button>
      </div>
    )
  }
}
