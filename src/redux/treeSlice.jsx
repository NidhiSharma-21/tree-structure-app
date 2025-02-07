
// treeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    addNode: (state, action) => {
      // Add the new node to the end of the array
      state.nodes.push(action.payload);
    },
    updateNode: (state, action) => {
      const index = state.nodes.findIndex((node) => node.id === action.payload.id);
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
    deleteNode: (state, action) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
    },
  },
});

export const { addNode, updateNode, deleteNode } = treeSlice.actions;
export default treeSlice.reducer;

