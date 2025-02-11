import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
};

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
      const { id, title, question, parentId, childCount } = action.payload;
      const newNode = { id, title, question, childCount, children: [] };
    
      if (!parentId) {
        state.nodes.push(newNode);
      } else {
        const parent = findNodeById(state.nodes, parentId);
        if (parent) {
          if (!Array.isArray(parent.children)) parent.children = [];
          if (parent.children.length >= parent.childCount) {
            console.error("Cannot add more children than the allowed limit.");
            return;
          }
          parent.children.push(newNode);
        } else {
          console.error("Parent node not found!");
        }
      }
    }
    ,

    updateNode: (state, action) => {
      const { id, title, question, childCount } = action.payload;
      const node = findNodeById(state.nodes, id);
      if (node) {
        node.title = title;
        node.question = question;
        node.childCount = childCount;
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
