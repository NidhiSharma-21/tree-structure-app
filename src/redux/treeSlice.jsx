import { createSlice } from "@reduxjs/toolkit"; // Import `createSlice` from Redux Toolkit to create a slice of the store.

const initialState = {
  nodes: [], // This array stores the tree structure, starting empty.
};

// Helper function to find a node by its ID in a nested tree structure
const findNodeById = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node; // If the node is found, return it.

    if (node.children) { // If the node has children, search recursively.
      const found = findNodeById(node.children, id);
      if (found) return found; // Return the node if found in children.
    }
  }
  return null; // If the node is not found, return null.
};

// Create the Redux slice for managing the tree structure
const treeSlice = createSlice({
  name: "tree", // Name of the slice, used when dispatching actions.
  initialState, // Set the initial state for this slice.

  reducers: {
    // Action to add a new node
    addNode: (state, action) => {
      const { id, title, question, parentId } = action.payload;
      
      // Create a new node object with empty children
      const newNode = { id, title, question, children: [] };

      if (!parentId) {
        // If parentId is null/undefined, add the node as a root node
        state.nodes.push(newNode);
      } else {
        // Otherwise, find the parent node
        const parent = findNodeById(state.nodes, parentId);
        if (parent) {
          parent.children.push(newNode); // Add the new node as a child
        }
      }
    },

    // Action to update an existing node
    updateNode: (state, action) => {
      const { id, title, question } = action.payload;

      // Find the node that needs to be updated
      const node = findNodeById(state.nodes, id);
      if (node) {
        node.title = title; // Update the title
        node.question = question; // Update the question
      }
    },

    // Action to delete a node and all its children
    deleteNode: (state, action) => {
      // Recursive function to remove a node and its children
      const deleteRecursively = (nodes, id) => {
        return nodes.filter(node => {
          if (node.id === id) return false; // If it's the node to delete, remove it.
          
          if (node.children) {
            // Recursively delete any matching children
            node.children = deleteRecursively(node.children, id);
          }
          return true; // Keep other nodes in the tree
        });
      };

      // Update the state by filtering out the deleted node
      state.nodes = deleteRecursively(state.nodes, action.payload);
    },
  },
});

// Export actions to use in components
export const { addNode, updateNode, deleteNode } = treeSlice.actions;

// Export the reducer to be used in the Redux store
export default treeSlice.reducer;
