import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import userSlice from "./userSlice";
export default configureStore({
  reducer : {
    todos : todoSlice,
    user : userSlice
  }
})
