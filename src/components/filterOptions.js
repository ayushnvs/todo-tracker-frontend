import React from 'react'

class FilterOptions extends React.Component {
  constructor(props) {
    super(props)

    this.filterBtn = React.createRef()
    this.dropDownBox = React.createRef()
    this.showFilterDropdown = this.showFilterDropdown.bind(this)
  }
  
  showFilterDropdown() {
      let dropDownBoxNode = this.dropDownBox.current
      console.log(dropDownBoxNode)
      let dropdownClasses = dropDownBoxNode.getAttribute('class')
      if (dropdownClasses.includes(' d-none')) {
        dropDownBoxNode.setAttribute('class', dropdownClasses.replace(' d-none', ''))
      }
      else dropDownBoxNode.setAttribute('class', dropdownClasses + ' d-none')
  }

  render() {
    return (
      <>
        <button ref={this.filterBtn} onClick={this.showFilterDropdown} type='button' className="btn btn-light filter border text-center">Column Filter</button>
        <div ref={this.dropDownBox} className='task-filter shadow p-3 mt-1 rounded-3 d-none'>
          <label className='d-block' htmlFor="category">
            <input className='me-2' type="checkbox" />
            Show Category
          </label>
          <label className='d-block' htmlFor="priority">
            <input className='me-2' type="checkbox" />
            Show Priority
          </label>
          <label className='d-block' htmlFor="user">
            <input className='me-2' type="checkbox" />
            Show User
          </label>
          <label className='d-block' htmlFor="option">
            <input className='me-2' type="checkbox" />
            Show Option
          </label>
        </div>
      </>
    );
  }
}

export default FilterOptions;