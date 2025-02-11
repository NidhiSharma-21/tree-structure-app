import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNode, deleteNode, updateNode } from "../redux/treeSlice";
import Modal from "./Modal";
import { Plus, Edit, Trash } from "lucide-react";

const Toolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingNode, setEditingNode] = useState(null);
  const [newNodeData, setNewNodeData] = useState({ title: "", question: "" });
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.tree.nodes);

  const handleAddNode = () => setIsOpen(true);

  const handleSaveNewNode = () => {
    if (!newNodeData.title || !newNodeData.question) return;
    const newNode = {
      id: Date.now(),
      title: newNodeData.title,
      question: newNodeData.question,
      parentId: nodes.length > 0 ? nodes[nodes.length - 1].id : null,
    };
    dispatch(addNode(newNode));
    setIsOpen(false);
    setNewNodeData({ title: "", question: "" });
  };

  const handleEditNode = (node) => {
    dispatch(updateNode(node));
    setEditingNode(null);
  };

  const handleDeleteNode = () => {
    if (nodes.length > 0) {
      dispatch(deleteNode(nodes[nodes.length - 1].id));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200 w-full max-w-5xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-wide mb-4 sm:mb-0">
        🌳 Tree Flow
      </h2>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <button
          onClick={handleAddNode}
          className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-md w-full sm:w-auto text-sm sm:text-base"
        >
          <Plus size={16} /> <span>Add Node</span>
        </button>

        <button
          onClick={() => setEditingNode(nodes.length > 0 ? nodes[nodes.length - 1] : null)}
          className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-md w-full sm:w-auto text-sm sm:text-base ${
            nodes.length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          disabled={nodes.length === 0}
        >
          <Edit size={16} /> <span>Edit Node</span>
        </button>

        <button
          onClick={handleDeleteNode}
          className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-md w-full sm:w-auto text-sm sm:text-base ${
            nodes.length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-red-500 text-white"
          }`}
          disabled={nodes.length === 0}
        >
          <Trash size={16} /> <span>Delete Node</span>
        </button>
      </div>

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          onSave={handleSaveNewNode}
          nodeData={newNodeData}
          setNodeData={setNewNodeData}
        />
      )}
      {editingNode && (
        <Modal
          node={editingNode}
          onClose={() => setEditingNode(null)}
          onSave={handleEditNode}
        />
      )}
    </div>
  );
};

export default Toolbar;
