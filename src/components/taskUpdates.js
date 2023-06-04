import React from "react";

class TaskUpdates extends React.Component {

  render() {
    return (
      <form onSubmit={(e) => {
        e.preventDefault()
      }}>
        <div className="task-updates form-control">{this.props.currentTask.updates.length > 0 ? this.props.currentTask.updates.slice(-1)[0] : ''}</div>
        <input type="text" className="task-updates form-control border-white" />
      </form>
    );
  }
}

export default TaskUpdates;