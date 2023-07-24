import React from 'react'

class FilterOptions extends React.Component {
  constructor(props) {
    super(props)

    this.filterBtnNode = React.createRef()
    this.dropDownBoxNode = React.createRef()
    this.showFilterDropdown = this.showFilterDropdown.bind(this)
    
  }
  
  showFilterDropdown() {
    console.log(this.dropDownBoxNode)
    let dropDownBoxNode = this.dropDownBoxNode.current
    let dropdownClasses = dropDownBoxNode.getAttribute('class')
    if (dropdownClasses.includes(' d-none')) {
      dropDownBoxNode.setAttribute('class', dropdownClasses.replace(' d-none', ''))
    }
    else dropDownBoxNode.setAttribute('class', dropdownClasses + ' d-none')
  }

  render() {
    return (
      <>
        <button ref={this.filterBtnNode} onClick={this.showFilterDropdown} type='button' className="btn btn-light filter border text-center">Column Filter</button>
        <div ref={this.dropDownBoxNode} className='task-filter shadow p-3 mt-1 rounded-3 d-none'>
          <label className='d-block' htmlFor="category">
            <input name='showCategory' checked={this.props.filters[0].showCategory} onChange={this.props.handleCategoryChange} className='me-2' type="checkbox" />
            Show Category
          </label>
          <label className='d-block' htmlFor="priority">
            <input name='showPriority' checked={this.props.filters[0].showPriority} onChange={this.props.handlePriorityChange} className='me-2' type="checkbox" />
            Show Priority
          </label>
          <label className='d-block' htmlFor="user">
            <input name='showUser' checked={this.props.filters[0].showUser} onChange={this.props.handleUserChange} className='me-2' type="checkbox" />
            Show User
          </label>
          <label className='d-block' htmlFor="option">
            <input name='showOption' checked={this.props.filters[0].showOption} onChange={this.props.handleOptionChange} className='me-2' type="checkbox" />
            Show Option
          </label>
        </div>
      </>
    );
  }
}

export default FilterOptions;