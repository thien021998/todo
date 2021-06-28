import React, { Component } from 'react';

class ShowForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      content : props.item.content || '',
    }
  }

  handleChange = (event) =>{
    this.setState({
      content : event.target.value
    })
  }

  handleOnSave = () => {
    const {handleSave} = this.props
    handleSave({content : this.state.content})
  }

  render() {
    const { handleCancel } = this.props
    return (
      <div>
        <div className="form-edit">
          <h3 className="title"> Form edit Items</h3>
        <form>
          <label className="form-label text-start d-block" htmlFor="fname">Content:</label><br />
          <input className="form-control" type="text" id="fname" name="content" value={this.state.content} onChange={this.handleChange}/><br />
        </form>
        <button className="btn btn-secondary" onClick={this.handleOnSave}>Submit</button>
        <button className="btn btn-primary mx-2" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default ShowForm;
