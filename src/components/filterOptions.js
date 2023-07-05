import React from 'react'

class FilterOptions extends React.Component {
  constructor(props) {
    super(props)

    this.filterBtn = React.createRef()
    this.dropDownBox = React.createRef()
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handlePriorityChange = this.handlePriorityChange.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.showFilterDropdown = this.showFilterDropdown.bind(this)

    this.state = {
      name: '',
      showCategory: '',
      showPriority: '',
      showUser: '',
      showOption: ''
    }
  }

  componentDidMount() {
    this.setState({
      showCategory: true,
      showPriority: true,
      showUser: true,
      showOption: true
    })
  }
  
  showFilterDropdown() {
      let dropDownBoxNode = this.dropDownBox.current
      let dropdownClasses = dropDownBoxNode.getAttribute('class')
      if (dropdownClasses.includes(' d-none')) {
        dropDownBoxNode.setAttribute('class', dropdownClasses.replace(' d-none', ''))
      }
      else dropDownBoxNode.setAttribute('class', dropdownClasses + ' d-none')
  }

  handleCategoryChange() {
    this.setState({
      showCategory: !this.state.showCategory
    })
  }

  handlePriorityChange() {
    this.setState({
      showPriority: !this.state.showPriority
    })
  }

  handleUserChange() {
    this.setState({
      showUser: !this.state.showUser
    })
  }

  handleOptionChange() {
    this.setState({
      showOption: !this.state.showOption
    })
  }

  render() {
    return (
      <>
        <button ref={this.filterBtn} onClick={this.showFilterDropdown} type='button' className="btn btn-light filter border text-center">Column Filter</button>
        <div ref={this.dropDownBox} className='task-filter shadow p-3 mt-1 rounded-3 d-none'>
          <label className='d-block' htmlFor="category">
            <input name='showCategory' checked={this.state.showCategory} onChange={this.handleCategoryChange} className='me-2' type="checkbox" />
            Show Category
          </label>
          <label className='d-block' htmlFor="priority">
            <input name='showPriority' checked={this.state.showPriority} onChange={this.handlePriorityChange} className='me-2' type="checkbox" />
            Show Priority
          </label>
          <label className='d-block' htmlFor="user">
            <input name='showUser' checked={this.state.showUser} onChange={this.handleUserChange} className='me-2' type="checkbox" />
            Show User
          </label>
          <label className='d-block' htmlFor="option">
            <input name='showOption' checked={this.state.showOption} onChange={this.handleOptionChange} className='me-2' type="checkbox" />
            Show Option
          </label>
        </div>
      </>
    );
  }
}

export default FilterOptions;