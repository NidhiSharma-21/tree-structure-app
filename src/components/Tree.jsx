import React from "react";
import { useSelector } from "react-redux";
import TreeNode from "./TreeNode";

const Tree = () => {
  const nodes = useSelector((state) => state.tree.nodes);
  
  return (
    <div className="mt-8 p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Tree Structure</h2>
      {nodes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold">No nodes available</p>
      ) : (
        <div className="space-y-4">
          {nodes.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tree;
