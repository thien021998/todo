/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect} from 'react'
import ShowForm from './ShowForm'
import { Redirect } from 'react-router-dom'

  const list = (props) => {

    const [arr, setArr] = useState([])
    const [item, setItem] = useState(undefined)
    const [search, setSearch] = useState('')
    const [Authorization] = useState(`Bearer ${localStorage.getItem("token")}`)
    const [input, setInput] = useState(undefined)
    const [itemInput,setItemInput] = useState(undefined)

  useEffect (() => {
    const fetchApi = async () =>{
      const data = await apiGetAll()
      try {
        if (data.message) {
          alert(data.message)
        } else {
          setArr(data.items)
        }
      } catch {
        alert(data.error)
      }
    }
    fetchApi()
  });

  const apiGetAll = async () => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos', {
      method: 'GET',
      headers: {
        Authorization: Authorization
      },
    })
    return response.json()
  }

  const apiDelete = async (id) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: Authorization
      },
    })
    return response.json()
  }

  const apiUpdate = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos/' + item.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Authorization
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  const apiUpdateInput = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos/' +itemInput.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Authorization
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  const apiCreate = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Authorization
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  const deleteItems = async (id) => {
    try {
      const arr = await apiDelete(id)
      console.log(arr)
    } catch {
      let index = arr.findIndex(i => i.id === id)
        arr.splice(index, 1)
        setArr(arr)
    }
  }

  const handleSave = async (data) => {
    console.log(data)
    let items
    if (item.id) {
      items = await apiUpdate(data)
      if(items.id){
        console.log(data.id)
          const newRecords = arr.map((record) => {
            if (record.id === data.id) {
              record = { ...record, ...data }
            }
            return record
          })
          setArr(newRecords)
      }
    } else {
      items = await apiCreate(data)
        if (items.id) {
          setArr([items,...arr])
        }
    }

    if (items.message) {
      alert(items.message)
    } else {
      handleCancel()
    }
  }

  const handleCancel = () => {
    setItem(undefined)
  }

  const handleEdit = (item) => {
    setItem(item)
  }

  const handleLogOut = () => {
    localStorage.removeItem("token")
    props.history.push("/login")
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const hanleInput = (data) => {
    setItemInput(data)
    setInput(data.content)
  }

  const updateInput = (e) => {
    setInput(e.target.value)
  }

  const save = async () => {
    let data = { content : input}
    let items = await apiUpdateInput(data)
      if(items.id){
          const newRecords = arr.map((record) => {
            if (record.id === data.id) {
              record = { ...record, ...data }
            }
            return record
          })
          setArr(newRecords)
      }
    setInput(undefined)
    setItemInput(undefined)
  }
    let final = []
    let newArr = arr.filter(item => {
      return item.content.toLowerCase().includes(search.toLowerCase())
    });
    if (search.length === 0) {
      final = arr
    } else {
      final = newArr
    }
    if (!localStorage.getItem("token")) {
      return (
        <Redirect to="/login" />
      )
    } else {
      return (
        <div className="row">
          <button className="btn btn-warning btn-login" onClick={handleLogOut}>logout</button>
          <h2 className="title">Render Form Todo-List with Reactjs</h2>
          <button className="btn btn-primary btn-create" onClick={() => handleEdit({})}>Create</button>
          {!!item && <ShowForm item={item} handleCancel={handleCancel} handleSave={handleSave} />}
          <div className="ui search">
            <div className="ui icon input">
              <input name="search" type="text" placeholder="Search Content" className="input-search" value={search} onChange={handleSearch} />
              <button className="btn-search" type="submit"><i className="fa fa-search"></i></button>
            </div>
          </div>
          <div className="table-wrapper">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Content</th>
                  <th>Status</th>
                  <th>Create-date</th>
                  <th>Update-date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {final.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td onDoubleClick={()=>hanleInput(item)}>{input === undefined ? item.content :
                       <> <input type="text" value ={input} onChange={updateInput}/> <button onClick={save}>save</button></>
                      }</td>
                      <td>{item.status}</td>
                      <td>{item.created_at.split("T", 1)}</td>
                      <td>{item.updated_at.split("T", 1)}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => handleEdit(item)}>
                          Edit
                        </button>
                        <button className="btn btn-primary" onClick={() => (deleteItems(item.id))}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div>{newArr.length === 0 && "Không tìm thấy item hợp lệ"}</div>
          </div>
        </div>
      )
    }
}

export default list
