import React, { useState } from 'react'; // Import React and useState hook for state management
import { useDispatch } from 'react-redux'; // Import useDispatch from React Redux to dispatch actions
import { addNode, updateNode } from '../redux/treeSlice'; // Import actions for adding and updating nodes

// Define the Modal component, accepting 'node' (existing node for editing) and 'onClose' (function to close modal)
const Modal = ({ node, onClose }) => {
  // Define state for title, initialized with node's title if editing, otherwise empty
  const [title, setTitle] = useState(node?.title || '');
  // Define state for question, initialized with node's question if editing, otherwise empty
  const [question, setQuestion] = useState(node?.question || '');
  // Define state for children count, initialized with node's children if editing, otherwise empty
  const [children, setChildren] = useState(node?.children || '');
  // Define state for error message, initially empty
  const [error, setError] = useState('');
  // Get the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = () => {
    // Check if any field is empty and set an error message if so
    if (!title || !question || children === '') {
      setError('All fields are mandatory');
      return; // Stop function execution if validation fails
    }
    // If editing an existing node, dispatch an update action
    if (node) {
      dispatch(updateNode({ ...node, title, question, children: parseInt(children) }));
    } else {
      // If adding a new node, dispatch an add action with a unique ID
      dispatch(addNode({ id: Date.now(), title, question, children: parseInt(children) }));
    }
    onClose(); // Close the modal after submission
  };

  return (
    // Modal backdrop with full-screen overlay to darken the background
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal container with white background, padding, rounded corners, and shadow */}
      <div className="bg-white p-6 rounded shadow w-96">
        {/* Modal title, dynamically set based on whether adding or editing */}
        <h3 className="text-lg font-bold mb-4">{node ? 'Edit Node' : 'Add Node'}</h3>
        
        {/* Display error message if validation fails */}
        {error && <p className="text-red-500">{error}</p>}
        
        {/* Input field for title with state binding */}
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {/* Input field for question with state binding */}
        <input
          type="text"
          placeholder="Question"
          className="w-full mb-2 p-2 border rounded"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        
        {/* Input field for number of children with state binding */}
        <input
          type="number"
          placeholder="Number of Children"
          className="w-full mb-2 p-2 border rounded"
          value={children}
          onChange={(e) => setChildren(e.target.value)}
        />
        
        {/* Container for action buttons with right alignment */}
        <div className="flex justify-end space-x-2">
          {/* Cancel button to close the modal without saving */}
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          {/* Submit button to add or edit the node */}
          <button onClick={handleSubmit} className="px-4 py-2 bg-orange-500 text-white rounded">
            Add +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; // Export the Modal component for use in other parts of the application
