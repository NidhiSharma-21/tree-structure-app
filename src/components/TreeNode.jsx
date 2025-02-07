import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNode } from "../redux/treeSlice";
import Modal from "./Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const TreeNode = () => {
  const nodes = useSelector((state) => state.tree.nodes);
  const dispatch = useDispatch();
  const [editingNode, setEditingNode] = React.useState(null);

  return (
    <div className="mt-6 p-6  max-w-3xl mx-auto">
      {nodes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold">
          No nodes available
        </p>
      ) : (
        <ul className="space-y-4">
          {nodes.map((node) => (
            <li
              key={node.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 transition-all duration-300"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{node.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{node.question}</p>
                {/* Display the number of children with a badge */}
                <p className="inline-block  text-sm font-bold text-gray-600 ">
                  Children: {node.children}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setEditingNode(node)}
                  className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition duration-200"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => dispatch(deleteNode(node.id))}
                  className="p-2 rounded-full text-red-500 hover:bg-red-100 transition duration-200"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editingNode && <Modal node={editingNode} onClose={() => setEditingNode(null)} />}
    </div>
  );
};

export default TreeNode;
