import React, { Component } from "react";
import axios from 'axios'

export default class CreateTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            updates: '',
            category: '',
            username: '',
            status: '',
            priority: '',
            categoryList: [],
            users: [],
            statusList: [],
            priorityList: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        categoryList: ['Office', 'Personal', 'Other'],
                        category: 'Other',
                        users: response.data.map(user => user.username),
                        username: 'ayush',
                        statusList: ['New', 'In Progress', 'Done'],
                        status: 'New',
                        priorityList: ['P0', 'P1', 'P2', 'P3', 'P4', 'NP'],
                        priority: 'NP'
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <h3 className="mt-3">Create A New Task</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    const task = {
                        name: this.state.name,
                        description: this.state.description,
                        updates: this.state.updates,
                        category: this.state.category,
                        username: this.state.username,
                        status: this.state.status,
                        priority: this.state.priority,
                    }

                    console.log(task)

                    axios.post('http://localhost:5000/tasks/add', task)
                        .then(res => console.log(res.data))

                    window.location = '/'
                }}>
                    <div className="form-group">
                        <label htmlFor="name">Task Name: </label>
                        <input type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            onChange={(e) => {
                                this.setState({
                                    name: e.currentTarget.value
                                })
                            }}
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={(e) => {
                                this.setState({
                                    description: e.currentTarget.value
                                })
                            }}
                            value={this.state.description}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="update">Update: </label>
                        <input type="text"
                            className="form-control"
                            id="update"
                            name="update"
                            onChange={(e) => {
                                this.setState({
                                    updates: e.currentTarget.value
                                })
                            }}
                            value={this.state.updates}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category: </label>
                        <select
                            required
                            className="form-control"
                            id="category"
                            value={this.state.category}
                            name="category"
                            onChange={(e) => {
                                this.setState({
                                    category: e.currentTarget.value
                                })
                            }}>
                            {this.state.categoryList.map(function (category) {
                                return <option
                                    key={category}
                                    value={category}>
                                    {category}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <select
                            required
                            className="form-control"
                            id="username"
                            value={this.state.username}
                            name="username"
                            onChange={(e) => {
                                this.setState({
                                    username: e.currentTarget.value
                                })
                            }}>
                            {this.state.users.map(function (user) {
                                return <option
                                    key={user}
                                    value={user}>
                                    {user}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status: </label>
                        <select
                            required
                            className="form-control"
                            id="status"
                            value={this.state.status}
                            name="status"
                            onChange={(e) => {
                                this.setState({
                                    status: e.currentTarget.value
                                })
                            }}>
                            {this.state.statusList.map(function (status) {
                                return <option
                                    key={status}
                                    value={status}>
                                    {status}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Priority: </label>
                        <select
                            required
                            className="form-control"
                            id="priority"
                            value={this.state.priority}
                            name="priority"
                            onChange={(e) => {
                                this.setState({
                                    priority: e.currentTarget.value
                                })
                            }}>
                            {this.state.priorityList.map(function (priority) {
                                return <option
                                    key={priority}
                                    value={priority}>
                                    {priority}
                                </option>
                            })}
                        </select>
                    </div>

                    <div className="form-group mt-3">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}