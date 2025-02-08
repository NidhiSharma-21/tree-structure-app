// redux/treeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
};

// Helper function to find a node by ID
const findNodeById = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    addNode: (state, action) => {
      const { id, title, question, parentId } = action.payload;
      const newNode = { id, title, question, children: [] };

      if (!parentId) {
        // If no parentId, it's a root node
        state.nodes.push(newNode);
      } else {
        // Find parent and add child
        const parent = findNodeById(state.nodes, parentId);
        if (parent) {
          parent.children.push(newNode);
        }
      }
    },
    updateNode: (state, action) => {
      const { id, title, question } = action.payload;
      const node = findNodeById(state.nodes, id);
      if (node) {
        node.title = title;
        node.question = question;
      }
    },
    deleteNode: (state, action) => {
      const deleteRecursively = (nodes, id) => {
        return nodes.filter(node => {
          if (node.id === id) return false;
          if (node.children) {
            node.children = deleteRecursively(node.children, id);
          }
          return true;
        });
      };
      state.nodes = deleteRecursively(state.nodes, action.payload);
    },
  },
});

export const { addNode, updateNode, deleteNode } = treeSlice.actions;
export default treeSlice.reducer;
