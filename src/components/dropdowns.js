import React from 'react'

function Form(props) {
  return (
    <form>
      <select
        required
        className="form-control task-status border-light-subtle text-center"
        id={props.data.name}
        name={props.data.name}
        onChange={(e) => { props.data.updateData(e, props.data.name, props.data.index) }}
        value={props.data.task[props.data.name]}
      >
        {props.data.dataList.map(function (data) {
          return <option
            className='dropdown-item'
            key={data}
            value={data}>
            {data}
          </option>
        })}
      </select>
    </form>
  )
}


export default function Dropdowns(props) {
  // console.log('props 1: ', props)
  return (
    props.task["status"] === 'Done' ?
    props.name === 'status' ?
    <div className="btn btn-success status-done" update-id={props.task._id}>
      Done
    </div>
    :
    <div className="btn">
      {props.task[props.name]}
    </div>
    : 
    <Form data={props}/>
  )
}
