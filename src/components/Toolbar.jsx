import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNode, deleteNode, updateNode } from "../redux/treeSlice";
import Modal from "./Modal";
import { Plus, Edit, Trash } from "lucide-react";

const Toolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingNode, setEditingNode] = useState(null);
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.tree.nodes);

  const handleAddNode = (node) => {
    dispatch(addNode(node));
    setIsOpen(false);
  };

  const handleEditNode = (node) => {
    dispatch(updateNode(node));
    setEditingNode(null);
  };

  const handleDeleteNode = () => {
    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      dispatch(deleteNode(lastNode.id));
    }
  };

  return (
    <div className="flex justify-between items-center bg-white/80 p-6 rounded-2xl shadow-xl border border-gray-200">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 tracking-wide">🌳 Tree Structure</h2>

      {/* Button Group */}
      <div className="flex space-x-4">
        {/* Add Node Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white px-5 py-2.5 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          <Plus size={20} /> <span className="font-medium">Add Node</span>
        </button>

        {/* Edit Node Button */}
        <button
          onClick={() =>
            setEditingNode(nodes.length > 0 ? nodes[nodes.length - 1] : null)
          }
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-md transition-all duration-300 ${
            nodes.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:scale-105 hover:shadow-lg"
          }`}
          disabled={nodes.length === 0}
        >
          <Edit size={20} /> <span className="font-medium">Edit Node</span>
        </button>

        {/* Delete Node Button */}
        <button
          onClick={handleDeleteNode}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-md transition-all duration-300 ${
            nodes.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-red-400 text-white hover:scale-105 hover:shadow-lg"
          }`}
          disabled={nodes.length === 0}
        >
          <Trash size={20} /> <span className="font-medium">Delete Node</span>
        </button>
      </div>

      {/* Modals */}
      {isOpen && <Modal onClose={() => setIsOpen(false)} onSave={handleAddNode} />}
      {editingNode && <Modal node={editingNode} onClose={() => setEditingNode(null)} onSave={handleEditNode} />}
    </div>
  );
};

export default Toolbar;
