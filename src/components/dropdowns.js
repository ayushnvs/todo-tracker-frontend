import React from 'react'

export default function Dropdowns(props) {
  return (
    props.name === 'status' && props.task[props.name] === 'Done' ?
    <div className="btn btn-success status-done">
      Done
    </div>
    : 
    <form>
      <select
        required
        className="form-control task-status border-light-subtle text-center"
        id={props.name}
        name={props.name}
        onChange={(e) => { props.updateData(e, props.name, props.index) }}
        value={props.task[props.name]}
      >
        {props.dataList.map(function (data) {
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
