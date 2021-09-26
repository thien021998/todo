/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import ShowForm from './ShowForm'
import { useHistory } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'
import format from 'utils/formatItems'
import { useDispatch, useSelector } from 'react-redux'
import { getTodoItems, deleteTodo, updateTodo, addTodo } from 'redux/todoSlice'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'

const TodoListRedux = () => {
  const history = useHistory()
  const [item, setItem] = useState(undefined)
  const [search, setSearch] = useState('')
  const [itemInput, setItemInput] = useState(undefined)
  const { updateToken } = useContext(AuthContext)
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)

  useEffect(async () => {
    try {
      const actionResult = await dispatch(getTodoItems());
      const currentTodos = unwrapResult(actionResult);
      if (currentTodos.todos.message) {
        toast.warning(currentTodos.todos.message)
      }
    }
    catch (err) {
      toast.error(err.message)
    }
  }, [dispatch]);

  const handleSave = useCallback(
    async (data) => {
      let actionResult
      if (itemInput) {
        try {
          actionResult = await dispatch(updateTodo(itemInput));
          const currentUpdate = unwrapResult(actionResult);
          if (currentUpdate.todo.message) {
            toast.warning(currentUpdate.todo.message)
          }
        }
        catch (err) {
          toast.error(err.message)
        }
      } else {
        try {
          actionResult = await dispatch(addTodo(data));
          const currentAdd = unwrapResult(actionResult);
          if (currentAdd.todo.message) {
            toast.warning(currentAdd.todo.message)
          }
        }
        catch (err) {
          toast.error(err.message)
        }
      }
      handleCancel()

    }, [item, itemInput])

  const handleCancel = useCallback(
    () => {
      if (item) {
        setItem(undefined)
      } else {
        setItemInput(undefined)
      }
    }, [item])

  const removeItem = useCallback(
    (id) => {
      dispatch(deleteTodo({ id }))
    }, [dispatch])

  const handleCreate = useCallback(
    (item) => {
      setItem(item)
    }, [item])

  const handleLogOut = useCallback(() => {
    localStorage.removeItem("token")
    updateToken()
    history.push("/login")
    }, [])

  const handleSearch = useCallback(
    (event) => {
      setSearch(event.target.value)
      // dispatch(searchTodo(event.target.value))
    }, [search])

  const updateInput = useCallback(
    (e) => {
      setItemInput({ ...itemInput, content: e.target.value })
    }, [itemInput])

  const todoItems = useMemo(() => {
    if (search.length === 0) {
      if (todos) {
        return format(todos?.todoItems)
      }
    } else {
      // tìm kiếm theo key Search
      const filtersItem = todos.todoItems.filter(item => {
        return item.content.toLowerCase().includes(search.toLowerCase())
      });
      // format ngày của mảng sau khi tìm kiếm
      return format(filtersItem)
    }
  }, [todos, search])

  return (
    <div className="row">
      <button className="btn btn-warning btn-login" onClick={handleLogOut}>logout</button>
      <h2 className="title">Render Form Todo-List with Reacts</h2>
      <button className="btn btn-primary btn-create" onClick={() => handleCreate({})}>Create</button>
      {!!item && <ShowForm item={item} handleCancel={handleCancel} handleSave={handleSave} loading={todos.loading} />}
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
          {todos.loading ?
            <>
              <tbody>
                <tr>
                  <td colSpan="6">Loading items....</td>
                </tr>
              </tbody>
            </> :
            <>
              <tbody>
                {todoItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td onDoubleClick={() => setItemInput(item)}>{itemInput && itemInput.id === item.id ?
                        <>
                          <input type="text" value={itemInput.content} onChange={updateInput} />
                          <button className="btn-primary" onClick={handleSave}>{todos.loading ? 'Loading...' : 'Save'}</button>
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
                          {todos.loading ? 'Loading...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </>
          }
        </table>
        <div>{todoItems.length === 0 && "Không tìm thấy item hợp lệ"}</div>
      </div>
    </div>
  )
}

export default TodoListRedux
