/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';

const ShowForm = (props) => {

  const [content, setContent] = useState('')

  const handleChange = (event) =>{
    setContent(event.target.value)
  }

  const handleOnSave = useCallback(
    () => {
      const {handleSave} = props
      handleSave({content : content})
  },[content])

  const { handleCancel } = props

  return (
      <div>
        <div className="form-edit">
          <h3 className="title"> Form edit Items</h3>
        <form>
          <label className="form-label text-start d-block" htmlFor="fname">Content:</label><br />
          <input className="form-control" type="text" id="fname" name="content" value={content} onChange={handleChange}/><br />
        </form>
        <button className="btn btn-secondary" onClick={handleOnSave}>Submit</button>
        <button className="btn btn-primary mx-2" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
  );
}

export default ShowForm;
