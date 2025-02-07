import { createSlice } from '@reduxjs/toolkit';

const initialState = { nodes: [] };

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    addNode: (state, action) => {
      const { id, title, question, children = [], parentNodeId } = action.payload;
      const newNode = { id, title, question, children };

      if (parentNodeId) {
        // If the node has a parent, find that parent node and add the new node as a child
        const parentNode = state.nodes.find(node => node.id === parentNodeId);
        if (parentNode) {
          parentNode.children.push(newNode);
        }
      } else {
        // Otherwise, add the node as a root node
        state.nodes.push(newNode);
      }
    },
    
    updateNode: (state, action) => {
      const { id, title, question, children } = action.payload;
      const nodeIndex = state.nodes.findIndex(node => node.id === id);

      if (nodeIndex !== -1) {
        // Update node information
        state.nodes[nodeIndex] = { ...state.nodes[nodeIndex], title, question, children };
      }
    },

    deleteNode: (state, action) => {
      const nodeId = action.payload;
      const deleteNodeRecursively = (nodeId, nodes) => {
        return nodes.reduce((acc, node) => {
          if (node.id === nodeId) {
            return acc; // Don't add the node we want to delete
          } else {
            if (node.children.length > 0) {
              node.children = deleteNodeRecursively(nodeId, node.children); // Recursively delete from children
            }
            acc.push(node);
            return acc;
          }
        }, []);
      };

      // Delete node from root level and from children
      state.nodes = deleteNodeRecursively(nodeId, state.nodes);
    },
  },
});

export const { addNode, updateNode, deleteNode } = treeSlice.actions;

export default treeSlice.reducer;
