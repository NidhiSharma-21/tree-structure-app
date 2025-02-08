// components/TreeView.jsx
import React from "react";
import { useSelector } from "react-redux";
import TreeNode from "./TreeNode";

const Tree = () => {
  const nodes = useSelector((state) => state.tree.nodes);

  return (
    <div className="p-6">
      {nodes.length > 0 ? (
        nodes.map((node) => <TreeNode key={node.id} node={node} />)
      ) : (
        <p className="text-gray-500">No nodes in the tree. Click "Add Node" to start.</p>
      )}
    </div>
  );
};

export default Tree;
