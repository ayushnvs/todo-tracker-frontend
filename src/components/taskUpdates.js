import React from "react";

class TaskUpdates extends React.Component {
  constructor(props) {
    super(props)

    this.updatesDiv = React.createRef()
    this.updatesInput = React.createRef()
  }

  componentDidMount() {
    const handlingInputTag = () => {
      let divNode = this.updatesDiv.current
      let inputBox = this.updatesInput.current

      if (divNode && inputBox) {
        divNode.addEventListener('click', () => {
          let currentUpdate = divNode.innerText
          divNode.setAttribute('class', divNode.getAttribute('class') + ' d-none')
          inputBox.setAttribute('value', currentUpdate)
          inputBox.style.display = 'block'
          inputBox.focus()
        })
        inputBox.style.display = 'none'
        inputBox.addEventListener('blur', async (e) => {
          inputBox.style.display = 'none'
          divNode.setAttribute('class', divNode.getAttribute('class').replace('d-none', ''))
          let previousUpdate = divNode.innerText.trim()
          if (previousUpdate !== e.currentTarget.value.trim()){
            divNode.innerText = e.currentTarget.value.trim()
            this.props.updateData(e, 'updates', this.props.taskKey)
          }          
        })
      }
    }
    handlingInputTag()
  }

  render() {
    return (
      this.props.currentTask.status === "Done" && this.props.currentTask.username !== "ayushvns" ?
        <div className="form-control task-updates-done overflow-y-auto">
          {this.props.currentTask.updates.length > 0 ? this.props.currentTask.updates.slice(-1)[0] : ''}
        </div>
        :
        <form onSubmit={(e) => {
          e.preventDefault()
        }}>
          <div ref={this.updatesDiv} className="task-updates form-control overflow-y-auto">{this.props.currentTask.updates.length > 0 ? this.props.currentTask.updates.slice(-1)[0] : ''}</div>
          <input ref={this.updatesInput} type="text" className="task-updates form-control border-white" />
        </form>
    );
  }
}

export default TaskUpdates;