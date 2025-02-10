// Import necessary dependencies from React and Redux
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNode, updateNode, deleteNode } from "../redux/treeSlice"; // Import Redux actions for managing tree nodes
import { Plus, Edit, Trash, Check, X } from "lucide-react"; // Import icons from Lucide for UI elements

// Define the TreeNode component, which represents a single node in the tree
const TreeNode = ({ node }) => {
  // State for managing editing mode
  const [isEditing, setIsEditing] = useState(false);
  // State for storing the edited title and question
  const [newTitle, setNewTitle] = useState(node?.title || "");
  const [newQuestion, setNewQuestion] = useState(node?.question || "");
  // State for handling the addition of a child node
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [childTitle, setChildTitle] = useState(""); // Stores the title of the new child
  const [childQuestion, setChildQuestion] = useState(""); // Stores the question of the new child
  const [childCount, setChildCount] = useState(1); // Stores the number of child nodes to be added
  const dispatch = useDispatch(); // Get the dispatch function to trigger Redux actions

  // Function to handle editing of a node
  const handleEdit = () => {
    if (!newTitle.trim() || !newQuestion.trim()) return; // Prevent empty values
    dispatch(updateNode({ ...node, title: newTitle, question: newQuestion })); // Dispatch the update action
    setIsEditing(false); // Exit editing mode
  };

  // Function to handle deletion of a node
  const handleDelete = () => {
    dispatch(deleteNode(node.id)); // Dispatch the delete action using node ID
  };

  // Function to start adding a child node
  const handleAddChild = () => {
    setIsAddingChild(true);
  };

  // Function to confirm adding a child node
  const confirmAddChild = () => {
    if (!childTitle.trim() || !childQuestion.trim()) return; // Prevent empty values

    const newChild = {
      id: Date.now(), // Generate a unique ID for the child node
      title: childTitle,
      question: childQuestion,
      parentId: node.id, // Set the parent ID
      children: [], // Initialize an empty array for children
    };

    dispatch(addNode(newChild)); // Dispatch action to add the child node

    // Handle multiple child additions
    if (childCount > 1) {
      setChildCount(childCount - 1);
    } else {
      setIsAddingChild(false);
      setChildTitle("");
      setChildQuestion("");
      setChildCount(1);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-200 w-full max-w-2xl mx-auto">
      {isEditing ? (
        <div className="space-y-3">
          {/* Input field for editing the title */}
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title..."
          />
          {/* Textarea for editing the question */}
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter question..."
          />
          {/* Buttons to save or cancel editing */}
          <div className="flex flex-wrap gap-3">
            <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Display node title and child count */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{node.title}</h3>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
              {node.children.length} {node.children.length === 1 ? "Child" : "Children"}
            </span>
          </div>
          {/* Display node question */}
          <p className="text-sm text-gray-700 mt-2">{node.question}</p>
          {/* Buttons for edit, delete, and add child */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
              <Edit size={18} /> Edit
            </button>
            <button onClick={handleDelete} className="flex items-center gap-2 text-red-600 hover:text-red-800 transition">
              <Trash size={18} /> Delete
            </button>
            <button onClick={handleAddChild} className="flex items-center gap-2 text-green-600 hover:text-green-800 transition">
              <Plus size={18} /> Add Child
            </button>
          </div>
        </div>
      )}

      {/* Form for adding a child node */}
      {isAddingChild && (
        <div className="mt-5 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-md font-medium text-gray-800">
            Enter Child Node Details ({childCount} remaining)
          </h4>
          {/* Input for child title */}
          <input
            type="text"
            value={childTitle}
            onChange={(e) => setChildTitle(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Child Title..."
          />
          {/* Textarea for child question */}
          <textarea
            value={childQuestion}
            onChange={(e) => setChildQuestion(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Child Question/Statement..."
          />
          {/* Input for number of child nodes to add */}
          <input
            type="number"
            value={childCount}
            onChange={(e) => setChildCount(Math.max(1, parseInt(e.target.value, 10)))}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
          {/* Buttons to confirm or cancel child addition */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button onClick={confirmAddChild} className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition flex items-center">
              <Check size={18} className="mr-2" /> Add
            </button>
            <button onClick={() => setIsAddingChild(false)} className="bg-gray-300 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition flex items-center">
              <X size={18} className="mr-2" /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Render child nodes recursively */}
      {node.children.length > 0 && (
        <div className="ml-4 sm:ml-6 mt-5 border-l-4 border-gray-300 pl-4 sm:pl-6">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

// Export the TreeNode component
export default TreeNode;
