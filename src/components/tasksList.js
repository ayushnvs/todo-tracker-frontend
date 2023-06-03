import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TaskUpdates from './taskUpdates'
import axios from 'axios'

export default class TasksList extends Component {

  constructor(props) {
    super(props)

    this.deleteTask = this.deleteTask.bind(this)
    this.updateData = this.updateData.bind(this)
    this.handlingInputTag = this.handlingInputTag.bind(this)

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
          statusList: ['New', 'In Progress', 'Done'],
          priorityList: ['P0', 'P1', 'P2', 'P3', 'P4', 'NP'],
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
    console.log(e.currentTarget.value)
    updatedTasks[key][data] = e.currentTarget.value
    await this.setState({
      task: updatedTasks
    })
    const newDataObj = {}
    newDataObj[data] = this.state.tasks[key][data]
    console.log(newDataObj)
    axios.post(`http://localhost:5000/tasks/update/${data}/` + updatedTasks[key]._id, newDataObj)
      .then(res => console.log(`${data.toUpperCase()} Updated`))
      .catch(err => console.log(err))
  }

  handlingInputTag () {
    let divNode = document.querySelectorAll('div.task-updates')
    let inputBox = document.querySelectorAll('input.task-updates')
    inputBox.forEach((el, key) => {
      el.style.display = 'none'
      el.addEventListener('focus', () => {
        console.log('Got focus')
      })
      el.addEventListener('blur', async (e) => {
        // e.preventDefault()
        console.log('Lost focus')
        divNode[key].innerText = e.currentTarget.value
        el.style.display = 'none'
        divNode[key].setAttribute('class', el.getAttribute('class').replace('d-none', ''))
        await this.updateData(e, 'updates', key)
      })
    })
    divNode.forEach((el, key) => {
      el.addEventListener('click', () => {
        let currentUpdate = el.innerText
        el.setAttribute('class', el.getAttribute('class') + ' d-none')
        inputBox[key].setAttribute('value', currentUpdate)
        inputBox[key].style.display = 'block'
        inputBox[key].focus()
      })
    })
  }

  render() {
    return (
      <div className='mt-3'>
        <h3 className='mt-5 d-inline'>Logged tasks</h3>
        <Link className="btn btn-primary d-inline ms-5" to="/create">Add New Task</Link>
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
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.tasks.map((currentTask, key) => {
                  return <tr key={currentTask._id}>
                    <td>
                      <form>
                        <select
                          required
                          className="form-control task-status border-light-subtle text-center"
                          id="status"
                          name="status"
                          onChange={(e) => { this.updateData(e, "status", key) }}
                          value={this.state.tasks[key].status}
                        >
                          {this.state.statusList.map(function (status) {
                            return <option
                              className='dropdown-item'
                              key={status}
                              value={status}>
                              {status}
                            </option>
                          })}
                        </select>
                      </form>
                    </td>
                    <td>
                      <div className="blockquote">{currentTask.name}</div>
                      {/* <div className="blockquote-footer">{currentTask.description}</div> */}
                    </td>
                    <td>
                      <TaskUpdates currentTask={currentTask} key={key}/>
                    </td>
                    <td>{currentTask.category}</td>
                    <td>{currentTask.priority}</td>
                    <td>{currentTask.username}</td>
                    <td><Link to={"/edit/" + currentTask._id}>edit</Link> | <button className='delete-task link-button d-none' onClick={() => { this.deleteTask(currentTask._id) }}>delete</button></td>
                  </tr>
                })
              }
              {this.handlingInputTag()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
