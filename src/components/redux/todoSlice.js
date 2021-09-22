/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let token = localStorage.getItem("token")

export const getTodo = createAsyncThunk(
  'todo/getTodo',
  async () => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      const todos = await response.json();
      return { todos };
  }
)

export const addTodo = createAsyncThunk(
  'todo/addTodo',
  async (payload) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    const todo = await response.json();
    return { todo }
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (payload) => {
    const response = await fetch(`https://todo-mvc-api-typeorm.herokuapp.com/api/todos/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content: payload.content })
    })
      const todo = await response.json();
      return { todo };
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (payload) => {
    const response = await fetch(`https://todo-mvc-api-typeorm.herokuapp.com/api/todos/${payload.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    if (response.ok) {
      return { id: payload.id };
    }
  }
)

export const todoSlice = createSlice({

  name: "todo",

  initialState: {
    loading: false,
    todo: []
  },

  reducers: {
    searchTodo: (state, action) => {
      if (action.payload) {
        return state.todo.filter(todo => todo.content.toLowerCase().includes(action.payload.toLowerCase()))
      }
      return state.todo
    }
  },

  extraReducers: {
    [getTodo.pending]: (state, action) => {
      state.loading = true
    },

    [getTodo.fulfilled]: (state, action) => {
      if (action.payload.todos.items) {
        state.todo = [...state.todo, ...action.payload.todos.items];
      state.loading = false;
      } else {
        state.loading = false;
      }
    },

    [addTodo.pending]: (state) => {
      state.loading = true
    },

    [addTodo.fulfilled]: (state, action) => {
      if (action.payload.todo.id) {
        state.loading = false;
        state.todo = [action.payload.todo, ...state.todo]
      } else {
        state.loading = false;
      }
    },

    [updateTodo.pending]: (state) => {
      state.loading = true
    },

    [updateTodo.fulfilled]: (state, action) => {
      if (action.payload.todo.id) {
        state.loading = false;
      state.todo = state.todo.map(todo => {
        if (todo.id === action.payload.todo.id) {
          todo = { ...todo, ...action.payload.todo }
        }
        return todo
      })
      } else {
        state.loading = false;
      }
    },

    [deleteTodo.pending]: (state, action) => {
      state.loading = true
    },

    [deleteTodo.fulfilled]: (state, action) => {
      state.loading = false
      state.todo = state.todo.filter(todo => todo.id !== action.payload.id)
    },
  }
})

export const { searchTodo } = todoSlice.actions
export default todoSlice.reducer
