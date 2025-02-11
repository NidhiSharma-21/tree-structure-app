// Import necessary dependencies from React and Redux
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNode, updateNode, deleteNode } from "../redux/treeSlice"; // Import Redux actions for managing tree nodes
import { Plus, Edit, Trash } from "lucide-react"; 

const TreeNode = ({ node }) => {
  const dispatch = useDispatch();

  // State for managing modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // State for editing a node
  const [editData, setEditData] = useState({
    title: node.title || "",
    question: node.question || "",
    childCount: node.childCount || 0,
  });

  // State for adding a child node
  const [newChildData, setNewChildData] = useState({
    title: "",
    question: "",
    childCount: "",
  });

  // Edit node handler
  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editData.title.trim() || !editData.question.trim()) return;

    dispatch(updateNode({ 
      id: node.id, 
      title: editData.title, 
      question: editData.question, 
      childCount: editData.childCount 
    }));

    setShowEditModal(false);
  };

  // Delete node handler
  const handleDelete = () => {
    dispatch(deleteNode(node.id));
  };

  // Add child node handler
  const handleAddChild = () => {
    if (node.children.length >= node.childCount) {
      alert("Cannot add more children than the allowed limit.");
      return;
    }
    setShowAddModal(true);
  };

  const handleSaveChild = () => {
    if (!newChildData.title.trim() || !newChildData.question.trim()) return;

    dispatch(addNode({
      id: Date.now(),
      title: newChildData.title,
      question: newChildData.question,
      childCount: newChildData.childCount,
      parentId: node.id
    }));

    setShowAddModal(false);
    setNewChildData({ title: "", question: "", childCount: 0 });
  };

  return (
    <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-200 w-full max-w-2xl mx-auto">
      
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{node.title}</h3>
        <span className="bg-gray-100 px-3 py-1 rounded-full">{node.children.length} Children</span>
      </div>

      <p className="text-sm mt-2">{node.question}</p>
      <p className="text-sm mt-2">Max Children: {node.childCount}</p>

      <div className="flex gap-3 mt-4">
        <button onClick={handleEdit} className="flex items-center gap-2 text-blue-600">
          <Edit size={18} /> Edit
        </button>
        <button onClick={handleDelete} className="flex items-center gap-2 text-red-600">
          <Trash size={18} /> Delete
        </button>
        <button onClick={handleAddChild} className="flex items-center gap-2 text-green-600">
          <Plus size={18} /> Add Child
        </button>
      </div>

      {/* Edit Node Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-lg font-bold mb-4">Edit Node</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-2 p-2 border rounded"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Question"
              className="w-full mb-2 p-2 border rounded"
              value={editData.question}
              onChange={(e) => setEditData({ ...editData, question: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Children"
              className="w-full mb-2 p-2 border rounded"
              value={editData.childCount}
              onChange={(e) => setEditData({ ...editData, childCount: Number(e.target.value) })}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-orange-500 text-white rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Child Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-lg font-bold mb-4">Add Child Node</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-2 p-2 border rounded"
              value={newChildData.title}
              onChange={(e) => setNewChildData({ ...newChildData, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Question"
              className="w-full mb-2 p-2 border rounded"
              value={newChildData.question}
              onChange={(e) => setNewChildData({ ...newChildData, question: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Children"
              className="w-full mb-2 p-2 border rounded"
              value={newChildData.childCount}
              onChange={(e) => setNewChildData({ ...newChildData, childCount: Number(e.target.value) })}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
              <button onClick={handleSaveChild} className="px-4 py-2 bg-orange-500 text-white rounded">
                Add +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Children */}
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

export default TreeNode;
