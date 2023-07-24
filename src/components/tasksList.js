import React, { Component, createRef } from 'react'
import { Link } from 'react-router-dom'
import TaskUpdates from './taskUpdates'
import Dropdowns from './dropdowns'
import FilterOptions from './filterOptions'
import axios from 'axios'

export default class TasksList extends Component {

  constructor(props) {
    super(props)

    this.statusHeadNode = React.createRef()
    this.nameHeadNode = React.createRef()
    this.userHeadNode = React.createRef()
    this.optionHeadNode = React.createRef()
    this.priorityHeadNode = React.createRef()
    this.categoryHeadNode = React.createRef()
    this.statusDataNode = React.createRef()
    this.nameDataNode = React.createRef()
    this.userDataNode = React.createRef()
    this.optionDataNode = React.createRef()
    this.priorityDataNode = React.createRef()
    this.categoryDataNode = React.createRef()
    this.deleteTask = this.deleteTask.bind(this)
    this.updateData = this.updateData.bind(this)
    this.changeDisplay = this.changeDisplay.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handlePriorityChange = this.handlePriorityChange.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)

    this.state = {
      tasks: [],
      categoryList: [],
      users: [],
      statusList: [],
      priorityList: [],
      filters: []
    }
  }

  componentDidMount() {

    this.setState({
      filters: [{
        showCategory: false,
        showPriority: true,
        showUser: false,
        showOption: true
      }]
    })

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

  updateData(e, data, key) {
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

  changeDisplay(node) {
    let nodeClasses = node.getAttribute('class')
    if (!nodeClasses) nodeClasses = ''
    if (nodeClasses.includes(' d-none')) {
      node.setAttribute('class', nodeClasses.replace(' d-none', ''))
    }
    else node.setAttribute('class', nodeClasses + ' d-none')
  }

  handleCategoryChange() {
    let updatedFilter = this.state.filters
    updatedFilter[0].showCategory = !updatedFilter[0].showCategory

    console.log(this.categoryDataNode)
    this.changeDisplay(this.categoryHeadNode.current)
    this.changeDisplay(this.categoryDataNode.current)

    this.setState({
      filters: updatedFilter
    })
  }

  handlePriorityChange() {
    let updatedFilter = this.state.filters
    updatedFilter[0].showPriority = !updatedFilter[0].showPriority

    this.setState({
      filters: updatedFilter
    })
  }

  handleUserChange() {
    let updatedFilter = this.state.filters
    updatedFilter[0].showUser = !updatedFilter[0].showUser

    this.changeDisplay(this.userHeadNode.current)
    this.changeDisplay(this.userDataNode.current)

    this.setState({
      filters: updatedFilter
    })
  }

  handleOptionChange() {
    let updatedFilter = this.state.filters
    updatedFilter[0].showOption = !updatedFilter[0].showOption

    this.changeDisplay(this.optionHeadNode.current)
    this.changeDisplay(this.optionDataNode.current)

    this.setState({
      filters: updatedFilter
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
            {
              this.state.filters.length > 0
              ?
              <FilterOptions filters={this.state.filters} handleCategoryChange={this.handleCategoryChange} handleOptionChange={this.handleOptionChange} handlePriorityChange={this.handlePriorityChange} handleUserChange={this.handleUserChange}/>
              : null
            }

          </div>
        </div>
        <div className="table-responsive">
          <table className="table mt-5">
            <thead className="thead-light">
              <tr>
                <th ref={this.statusHeadNode} >Status</th>
                <th ref={this.nameHeadNode}>Task Name</th>
                <th ref={this.updatesHeadNode}>Updates</th>
                <th ref={this.categoryHeadNode}>Category</th>
                {console.log('s', this.state.filters[0].showUser)}
                { this.state.filters ?
                // <th>Prority</th>
                console.log('Hey', this.state.filters[0])
                : null }
                <th ref={this.userHeadNode}>User</th>
                <th ref={this.optionHeadNode}>Options</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.tasks.map((currentTask, key) => {
                  return <tr key={currentTask._id}>
                    <td ref={this.statusDataNode}>
                      <Dropdowns name={"status"} dataList={this.state.statusList} task={currentTask} updateData={this.updateData} key={key} index={key} />
                    </td>
                    <td ref={this.nameDataNode}>
                      <div className="blockquote">{currentTask.name}</div>
                      {/* <div className="blockquote-footer">{currentTask.description}</div> */}
                    </td>
                    <td ref={this.updatesDataNode}>
                      <TaskUpdates currentTask={currentTask} key={key} updateData={this.updateData} taskKey={key} />
                    </td>
                    <td ref={this.categoryDataNode}>
                      <Dropdowns name={"category"} dataList={this.state.categoryList} task={currentTask} updateData={this.updateData} key={key} index={key} />
                    </td>
                    { this.state.filters[0].showPriority ?
                    <td>
                      <Dropdowns name={"priority"} dataList={this.state.priorityList} task={currentTask} updateData={this.updateData} key={key} index={key} />
                    </td>
                    : null }
                    <td ref={this.userDataNode}>
                      <Dropdowns name={"username"} dataList={this.state.users} task={currentTask} updateData={this.updateData} key={key} index={key} />
                    </td>
                    <td ref={this.optionDataNode}><Link to={"/edit/" + currentTask._id}>edit</Link> | <button className='delete-task link-button d-none' onClick={() => { this.deleteTask(currentTask._id) }}>delete</button></td>
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
