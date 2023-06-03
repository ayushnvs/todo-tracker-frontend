import React from "react";

class TaskUpdates extends React.Component {
  constructor(props) {
    super(props)
  }  

  render() {
    return (
      <form>
        <div className="task-updates form-control">{this.props.currentTask.updates.length > 0 ? this.props.currentTask.updates.slice(-1)[0] : ''}</div>
        <input type="text" onChange={null} className="task-updates form-control border-white" />
      </form>
    );
  }
}

export default TaskUpdates;