// Importing necessary dependencies from React and Redux
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // useDispatch to dispatch actions, useSelector to access state
import { addNode, deleteNode, updateNode } from "../redux/treeSlice"; // Importing Redux actions
import Modal from "./Modal"; // Importing the Modal component
import { Plus, Edit, Trash } from "lucide-react"; // Importing icons from lucide-react

// Defining the Toolbar component
const Toolbar = () => {
  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(false);
  
  // State to track the node being edited
  const [editingNode, setEditingNode] = useState(null);
  
  // State to store new node data (title and question)
  const [newNodeData, setNewNodeData] = useState({ title: "", question: "" });

  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Selecting the nodes array from the Redux store
  const nodes = useSelector((state) => state.tree.nodes);

  // Function to open the modal for adding a new node
  const handleAddNode = () => setIsOpen(true);

  // Function to save a new node to the tree
  const handleSaveNewNode = () => {
    if (!newNodeData.title || !newNodeData.question) return; // Prevent saving empty nodes

    // Creating a new node object
    const newNode = {
      id: Date.now(), // Generating a unique ID based on timestamp
      title: newNodeData.title, 
      question: newNodeData.question,
      parentId: nodes.length > 0 ? nodes[nodes.length - 1].id : null, // Assign parent ID if nodes exist
    };

    dispatch(addNode(newNode)); // Dispatching action to add node
    setIsOpen(false); // Closing the modal
    setNewNodeData({ title: "", question: "" }); // Resetting the input fields
  };

  // Function to edit a node and update its details
  const handleEditNode = (node) => {
    dispatch(updateNode(node)); // Dispatching action to update node
    setEditingNode(null); // Closing the edit modal
  };

  // Function to delete the last node from the tree
  const handleDeleteNode = () => {
    if (nodes.length > 0) {
      dispatch(deleteNode(nodes[nodes.length - 1].id)); // Deleting the last node
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200 w-full max-w-5xl mx-auto">
      {/* Title for the toolbar */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-wide mb-4 sm:mb-0">
        🌳 Tree Flow
      </h2>

      {/* Button group for adding, editing, and deleting nodes */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        
        {/* Add Node Button */}
        <button
          onClick={handleAddNode} // Opens the add node modal
          className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-md w-full sm:w-auto text-sm sm:text-base"
        >
          <Plus size={16} /> <span>Add Node</span>
        </button>

        {/* Edit Node Button */}
        <button
          onClick={() => setEditingNode(nodes.length > 0 ? nodes[nodes.length - 1] : null)} // Opens edit modal for last node
          className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-md w-full sm:w-auto text-sm sm:text-base ${
            nodes.length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          disabled={nodes.length === 0} // Disables the button if no nodes exist
        >
          <Edit size={16} /> <span>Edit Node</span>
        </button>

        {/* Delete Node Button */}
        <button
          onClick={handleDeleteNode} // Deletes the last node
          className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-md w-full sm:w-auto text-sm sm:text-base ${
            nodes.length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-red-500 text-white"
          }`}
          disabled={nodes.length === 0} // Disables the button if no nodes exist
        >
          <Trash size={16} /> <span>Delete Node</span>
        </button>
      </div>

      {/* Modal for adding a new node */}
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)} // Closes modal
          onSave={handleSaveNewNode} // Calls function to save the new node
          nodeData={newNodeData} // Passes current input data
          setNodeData={setNewNodeData} // Updates input data
        />
      )}

      {/* Modal for editing an existing node */}
      {editingNode && (
        <Modal
          node={editingNode} // Passes the selected node for editing
          onClose={() => setEditingNode(null)} // Closes modal
          onSave={handleEditNode} // Calls function to save edits
        />
      )}
    </div>
  );
};

// Exporting the Toolbar component to be used in other parts of the application
export default Toolbar;
