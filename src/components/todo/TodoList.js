/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import ShowForm from './ShowForm'
import { useHistory } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'
import format from 'utils/formatItems'
import { useCreateItem, useDeleteItem, useUpdataItem, useGetTodoList } from 'hooks'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = () => {
  const history = useHistory()
  const [items, setItems] = useState([])
  const [item, setItem] = useState(undefined)
  const [remove, setRemove] = useState(undefined)
  const [search, setSearch] = useState('')
  const [itemInput, setItemInput] = useState(undefined)
  const { updateToken, token } = useContext(AuthContext)
  const { createItem, loadingCreate } = useCreateItem()
  const { deleteItem, loadingDelete } = useDeleteItem()
  const { updataItem, loadingUpdate } = useUpdataItem()
  const { getTodoList, loading } = useGetTodoList()

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getTodoList()
      try {
        if (data.message) {
          toast.warning(data.message)
        } else {
          setItems(data.items)
        }
      } catch {
        toast.error(data.error)
      }
    }
    fetchApi()
  }, [getTodoList]);

  const handleSave = useCallback(
    async (data) => {
      let item
      // nếu tồn tại itemInput thì call Api update
      // nếu ko có itemInput thì call Api create
      if (itemInput) {
        item = await updataItem(itemInput.id, itemInput.content)
        if (item.id) {
          const newRecords = items.map((record) => {
            if (record.id === item.id) {
              record = { ...record, ...item }
            }
            return record
          })
          setItems(newRecords)
        }
      } else {
        item = await createItem({ data })
        if (item.id) {
          setItems([item, ...items])
        }
      }

      if (item.message) {
        toast.warning(item.message)
      } else {
        handleCancel()
      }
    },
    [item, itemInput]
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

  const removeItem = useCallback(
    async (id) => {
      try {
        setRemove(id)
        const item = await deleteItem(id)
        console.log("item: ", item)
      } catch (err) {
        console.log(err)
        let index = items.findIndex(i => i.id === id)
        items.splice(index, 1)
        setItems([...items])
      }
      setRemove(undefined)
    }, [items])

  const handleCreate = useCallback(
    (item) => {
      setItem(item)
    }, [item])

  const handleLogOut = useCallback(() => {
    localStorage.removeItem("token")
    updateToken()
    history.push("/login")
  }, [token])

  const handleSearch = useCallback(
    (event) => {
      setSearch(event.target.value)
    }, [search])

  const updateInput = useCallback(
    (e) => {
      setItemInput({ ...itemInput, content: e.target.value })
    }, [itemInput])

  const todoItems = useMemo(() => {
    if (search.length === 0) {
      if (items) {
        return format(items)
      }
    } else {
      // tìm kiếm theo key Search
      const filtersItem = items.filter(item => {
        return item.content.toLowerCase().includes(search.toLowerCase())
      });
      // format ngày của mảng sau khi tìm kiếm
      return format(filtersItem)
    }
  }, [items, search])

  return (
    <div className="row">
      <button className="btn btn-warning btn-login" onClick={handleLogOut}>logout</button>
      <h2 className="title">Render Form Todo-List with Reactjs</h2>
      <button className="btn btn-primary btn-create" onClick={() => handleCreate({})}>Create</button>
      {!!item && <ShowForm item={item} handleCancel={handleCancel} handleSave={handleSave} loadingCreate={loadingCreate} />}
      <div className="ui search">
        <div className="ui icon input">
          <input name="search" type="text" placeholder="Search Content" className="input-search" value={search} onChange={handleSearch} />
          <button className="btn-search" type="submit"><i className="fa fa-search"></i></button>
        </div>
      </div>
      {loading ? loading :
        <>
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
                          <button onClick={handleSave}>{loadingUpdate ? loadingUpdate : 'Save'}</button>
                        </> : item.content
                      }</td>
                      <td>{item.status}</td>
                      <td>{item.created_at}</td>
                      <td>{item.updated_at}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => setItemInput(item)}>
                          Edit
                        </button>
                        <button className="btn btn-primary" onClick={() => (removeItem(item.id))}>
                          {loadingDelete && remove && remove === item.id ? loadingDelete : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div>{todoItems.length === 0 && "Không tìm thấy item hợp lệ"}</div>
          </div>
        </>
      }
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  )
}

export default TodoList
