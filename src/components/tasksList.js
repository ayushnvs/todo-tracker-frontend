import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TaskUpdates from './taskUpdates'
import Dropdowns from './dropdowns'
import FilterOptions from './filterOptions'
import axios from 'axios'

export default class TasksList extends Component {

  constructor(props) {
    super(props)

    this.deleteTask = this.deleteTask.bind(this)
    this.updateData = this.updateData.bind(this)

    this.state = {
      tasks: [],
      categoryList: [],
      users: [],
      statusList: [],
      priorityList: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks')
      .then(res => {
        this.setState({
          tasks: res.data.reverse(),
          categoryList: ['Office', 'Personal', 'Other'],
          statusList: ['New', 'In Progress', 'Pending', 'Blocked', 'Done'],
          priorityList: ['P0', 'P1', 'P2', 'P3', 'P4', 'NP'],
        })
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('http://localhost:5000/users')
      .then(res => {
        this.setState({
          users: res.data.map(user => user.username)
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

  async updateData(e, data, key) {
    let updatedTasks = this.state.tasks
    if (data === "updates") updatedTasks[key][data].push(e.currentTarget.value.trim())
    else updatedTasks[key][data] = e.currentTarget.value.trim()

    const newDataObj = {}
    newDataObj[data] = e.currentTarget.value.trim()
    console.log(newDataObj)

    axios.post(`http://localhost:5000/tasks/update/${data}/` + updatedTasks[key]._id, newDataObj)
      .then(res => console.log(`${data.toUpperCase()} Updated`))
      .catch(err => console.log(err))

    this.setState({
      task: updatedTasks
    })
  }

  render() {
    return (
      <div className='mt-3'>
        <div className="header row align-items-center">
          <div className='col-4'>
            <h3>Logged tasks</h3>
          </div>
          <div className='col-4'>
            <Link className="btn btn-primary ms-5" to="/create">Add New Task</Link>
          </div>
          <div className="show-columns col-4">
            <FilterOptions/>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table mt-5">
            <thead className="thead-light">
              <tr>
                <th>Status</th>
                <th>Task Name</th>
                <th>Updates</th>
                <th>Category</th>
                <th>Prority</th>
                <th>User</th>
                {/* <th>Options</th> */}
              </tr>
            </thead>
            <tbody>
              {
                this.state.tasks.map((currentTask, key) => {
                  return <tr key={currentTask._id}>
                    <td>
                      <Dropdowns name={"status"} dataList={this.state.statusList} task={currentTask} updateData={this.updateData} key={key} index={key} />
                    </td>
                    <td>
                      <div className="blockquote">{currentTask.name}</div>
                      {/* <div className="blockquote-footer">{currentTask.description}</div> */}
                    </td>
                    <td>
                      <TaskUpdates currentTask={currentTask} key={key} updateData={this.updateData} taskKey={key} />
                    </td>
                    <td>
                      <Dropdowns name={"category"} dataList={this.state.categoryList} task={currentTask} updateData={this.updateData} key={key} index={key} />
                    </td>
                    <td>
                      <Dropdowns name={"priority"} dataList={this.state.priorityList} task={currentTask} updateData={this.updateData} key={key} index={key} />
                    </td>
                    <td>
                      <Dropdowns name={"username"} dataList={this.state.users} task={currentTask} updateData={this.updateData} key={key} index={key} />
                    </td>
                    {/* <td><Link to={"/edit/" + currentTask._id}>edit</Link> | <button className='delete-task link-button d-none' onClick={() => { this.deleteTask(currentTask._id) }}>delete</button></td> */}
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
