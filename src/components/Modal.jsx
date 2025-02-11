import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNode, updateNode } from "../redux/treeSlice";

const Modal = ({ node, onClose, parentId }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(node?.title || "");
  const [question, setQuestion] = useState(node?.question || "");
  const [childCount, setChildCount] = useState(node?.childCount?.toString() || ""); // Ensure childCount is properly initialized as a string
  const [error, setError] = useState("");

  // **Ensure childCount is updated when a node is being edited**
  useEffect(() => {
    if (node) {
      setTitle(node.title);
      setQuestion(node.question);
      setChildCount(node.childCount.toString()); // Convert to string for controlled input
    }
  }, [node]);

  const handleSubmit = () => {
    if (!title || !question || childCount === "") {
      setError("All fields are mandatory");
      return;
    }

    if (isNaN(childCount) || parseInt(childCount) < 0) {
      setError("Number of children must be a non-negative number");
      return;
    }

    const parsedChildCount = parseInt(childCount);

    if (node) {
      dispatch(updateNode({ ...node, title, question, childCount: parsedChildCount }));
    } else {
      dispatch(addNode({ id: Date.now(), title, question, childCount: parsedChildCount, parentId }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-lg font-bold mb-4">{node ? "Edit Node" : "Add Node"}</h3>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Question"
          className="w-full mb-2 p-2 border rounded"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Children"
          className="w-full mb-2 p-2 border rounded"
          value={childCount}
          onChange={(e) => setChildCount(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-orange-500 text-white rounded">
            {node ? "Update" : "Add"} +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
