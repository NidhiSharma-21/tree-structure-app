import React from "react";
import { useSelector } from "react-redux";
import TreeNode from "./TreeNode";

const Tree = () => {
  const nodes = useSelector((state) => state.tree.nodes);

  return (
    <div className="p-4">
      {nodes.length === 0 ? <p>No nodes available. Click "Add Node" to create one.</p> : (
        nodes.map(node => !node.parentId && <TreeNode key={node.id} node={node} />)
      )}
    </div>
  );
};

export default Tree;
