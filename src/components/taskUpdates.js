import React from "react";

class TaskUpdates extends React.Component {
  constructor(props) {
    super(props)

    this.handlingInputTag = this.handlingInputTag.bind(this)
  }

  componentDidMount() {
    this.handlingInputTag()
  }

  handlingInputTag () {
    let divNode = document.querySelectorAll('div.task-updates')
    let inputBox = document.querySelectorAll('input.task-updates')
    inputBox.forEach((el) => {
      el.style.display = 'none'
    })
    divNode.forEach((el, key) => {
      el.addEventListener('click', () => {
        let currentUpdate = el.innerText
        el.style.display = 'none'
        inputBox[key].setAttribute('value', currentUpdate)
        inputBox[key].style.display = 'block'
        console.log('Clicking on input box!')
        inputBox[key].click()
      })
    })
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