import { configureStore } from "@reduxjs/toolkit";
import treeReducer from "./treeSlice";

const store = configureStore({
  reducer: {
    tree: treeReducer,
  },
});

export default store;
