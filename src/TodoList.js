/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import ShowForm from './ShowForm'
import TodoApi from './api/TodoApi'
import { useHistory } from 'react-router'
import AuthContext from './AuthContext'

 function formatItems(items) {
    return items.map(item => {
      const date = {
        ...item,
        created_at: item.created_at.split("T", 1),
        updated_at: item.updated_at.split("T", 1)
      }
      return date
    })
 }

const list = () => {
  const history = useHistory()
  const [arr, setArr] = useState([])
  const [item, setItem] = useState(undefined)
  const [search, setSearch] = useState('')
  const [itemInput, setItemInput] = useState(undefined)
  const {updateToken,token} = useContext(AuthContext)

  useEffect(() => {
    const fetchApi = async () => {
      const data = await TodoApi.getAll(token)
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
  }, []);

  const handleSave = useCallback(
    async (data) => {
      let item
      // nếu tồn tại itemInput thì call Api update
      // nếu ko có itemInput thì call Api create
      if (itemInput) {
        item = await TodoApi.update(itemInput.id, itemInput.content,token)
        if (item.id) {
          const newRecords = arr.map((record) => {
            if (record.id === item.id) {
              record = { ...record, ...item }
            }
            return record
          })
          setArr(newRecords)
        }
      } else {
        item = await TodoApi.create(data,token)
        if (item.id) {
          setArr([item, ...arr])
        }
      }

      if (item.message) {
        alert(item.message)
      } else {
        handleCancel()
      }
    },
    [item || itemInput]
  )

  const handleCancel = useCallback(
    () => {
      if (item) {
        setItem(undefined)
      } else {
        setItemInput(undefined)
      }
    },
    [item]
  )

  const deleteItem = useCallback(
    async (id) => {
      try {
        const arr = await TodoApi.delete(id,token)
        console.log(arr)
      } catch {
        let index = arr.findIndex(i => i.id === id)
        arr.splice(index, 1)
        setArr([...arr])
      }
    },[arr])

  const handleCreate = useCallback(
    (item) => {
      setItem(item)
    },[])

  const handleLogOut = useCallback(() => {
    localStorage.removeItem("token")
    updateToken()
    history.push("/login")
  }, [])

  const handleSearch = useCallback(
    (event) => {
      setSearch(event.target.value)
    },[])

  const updateInput = useCallback(
    (e) => {
      setItemInput({ ...itemInput, content: e.target.value })
    },[])

  const todoItems = useMemo(() => {
    if (search.length === 0) {
      if (arr) {
        return formatItems(arr)
      }
    } else {
      // tìm kiếm theo key Search
      const filtersItem = arr.filter(item => {
        return item.content.toLowerCase().includes(search.toLowerCase())
      });
      // format ngày của mảng sau khi tìm kiếm
      return formatItems(filtersItem)
    }
  }, [arr, search])

  return (
    <div className="row">
      <button className="btn btn-warning btn-login" onClick={handleLogOut}>logout</button>
      <h2 className="title">Render Form Todo-List with Reactjs</h2>
      <button className="btn btn-primary btn-create" onClick={() => handleCreate({})}>Create</button>
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
            {todoItems.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td onDoubleClick={() => setItemInput(item)}>{itemInput && itemInput.id === item.id ?
                    <>
                      <input type="text" value={itemInput.content} onChange={updateInput} />
                      <button onClick={handleSave}>save</button>
                    </> : item.content
                  }</td>
                  <td>{item.status}</td>
                  <td>{item.created_at}</td>
                  <td>{item.updated_at}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => setItemInput(item)}>
                      Edit
                    </button>
                    <button className="btn btn-primary" onClick={() => (deleteItem(item.id))}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>{todoItems.length === 0 && "Không tìm thấy item hợp lệ"}</div>
      </div>
    </div>
  )
}

export default list
