/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ShowForm from './ShowForm'
import { Redirect } from 'react-router-dom'
import TodoApi from './api/TodoApi'

const list = (props) => {

  const [arr, setArr] = useState([])
  const [item, setItem] = useState(undefined)
  const [search, setSearch] = useState('')
  const [itemInput, setItemInput] = useState(undefined)

  useEffect(() => {
    const fetchApi = async () => {
      const data = await TodoApi.getAll()
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
        item = await TodoApi.update(itemInput.id, itemInput.content)
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
        item = await TodoApi.create(data)
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
    []
  )

  const deleteItem = async (id) => {
    try {
      const arr = await TodoApi.delete(id)
      console.log(arr)
    } catch {
      let index = arr.findIndex(i => i.id === id)
      arr.splice(index, 1)
      setArr([...arr])
    }
  }

  const handleCreate = (item) => {
    setItem(item)
  }

  const handleLogOut = useCallback(() => {
    localStorage.removeItem("token")
    props.history.push("/login")
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const updateInput = (e) => {
    setItemInput({ ...itemInput, content: e.target.value })
  }

  const TodoItems = useMemo(() => {
    if (search.length === 0) {
      if (arr) {
        // format ngày của mảng
        let newArr = arr.map(item => {
          let date = {
            ...item,
            created_at: item.created_at.split("T", 1),
            updated_at: item.updated_at.split("T", 1)
          }

          return date
        })

        return newArr
      }
    } else {
      // tìm kiếm theo key Search
      let newArr = arr.filter(item => {
        return item.content.toLowerCase().includes(search.toLowerCase())
      });
      // format ngày của mảng sau khi tìm kiếm
      let filtersItem = newArr.map(item => {
        let date = {
          ...item,
          created_at: item.created_at.split("T", 1),
          updated_at: item.updated_at.split("T", 1)
        }
        return date
      })

      return filtersItem
    }
  }, [arr, search])

  if (!localStorage.getItem("token")) {
    return (
      <Redirect to="/login" />
    )
  } else {
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
              {TodoItems.map((item) => {
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
          <div>{TodoItems.length === 0 && "Không tìm thấy item hợp lệ"}</div>
        </div>
      </div>
    )
  }
}

export default list
