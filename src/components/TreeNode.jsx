import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNode, addNode } from "../redux/treeSlice";
import Modal from "./Modal";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const TreeNode = () => {
  const nodes = useSelector((state) => state.tree.nodes);
  const dispatch = useDispatch();
  const [editingNode, setEditingNode] = useState(null);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [parentNode, setParentNode] = useState(null);

  const handleAddChildNode = (parentNode) => {
    setParentNode(parentNode);
    setEditingNode(null);
    setIsAddingChild(true);
  };

  return (
    <div className="mt-8 p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Tree Structure</h2>

      {nodes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold">No nodes available</p>
      ) : (
        <ul className="space-y-4">
          {nodes.map((node) => (
            <li
              key={node.id}
              className="flex justify-between items-center p-5 bg-gray-50 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{node.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{node.question}</p>
                {/* Child Count Badge */}
                <span className="inline-block px-3 py-1 mt-2 text-xs font-semibold text-white bg-gray-700 rounded-full">
                  Children: {node.children}
                </span>
              </div>
              <div className="flex space-x-2">
                {/* Edit Button */}
                <button
                  onClick={() => setEditingNode(node)}
                  className="p-2 rounded-full text-blue-500 bg-blue-100 hover:bg-blue-200 transition duration-200"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => dispatch(deleteNode(node.id))}
                  className="p-2 rounded-full text-red-500 bg-red-100 hover:bg-red-200 transition duration-200"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
                {/* Add Child Button */}
                <button
                  onClick={() => handleAddChildNode(node)}
                  className="p-2 rounded-full text-green-500 bg-green-100 hover:bg-green-200 transition duration-200"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Modals */}
      {editingNode && (
        <Modal node={editingNode} onClose={() => setEditingNode(null)} />
      )}
      {isAddingChild && (
        <Modal
          parentNode={parentNode}
          onClose={() => setIsAddingChild(false)}
          onSave={(newChildNode) => {
            dispatch(addNode({ ...newChildNode, parentNodeId: parentNode.id }));
            setIsAddingChild(false);
          }}
        />
      )}
    </div>
  );
};

export default TreeNode;
