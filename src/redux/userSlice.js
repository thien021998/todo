/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  'user/register',
  async (payload) => {
    const response = await fetch(
      'https://todo-mvc-api-typeorm.herokuapp.com/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );
    let data = await response.json();
    return { data };
  }
)

export const login = createAsyncThunk(
  'user/login',
  async (payload) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json();
    return { data };
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
  },

  reducers: {
    clearSuccess: () => {
      state.loading = false;
    }
  },

  extraReducers: {
    [signup.pending]: (state) => {
      state.loading = true
    },

    [signup.fulfilled]: (state, action) => {
        state.loading = false
    },

    [login.pending]: (state) => {
      state.loading = true
    },

    [login.fulfilled]: (state, action) => {
        state.loading = false
    },
  }
})
export const { clearState } = userSlice.actions;
export default userSlice.reducer
export const userSelector = (state) => state.user;
