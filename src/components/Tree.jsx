// Importing necessary dependencies from React and Redux
import React from "react";
import { useSelector } from "react-redux"; // useSelector allows access to the Redux store
import TreeNode from "./TreeNode"; // Importing the TreeNode component

// Defining the Tree component
const Tree = () => {
  // Selecting the nodes from the Redux store
  const nodes = useSelector((state) => state.tree.nodes);

  return (
    <div className="p-6"> {/* Adding padding to the container */}
      {/* Checking if there are nodes in the tree */}
      {nodes.length > 0 ? (
        // Mapping through the nodes and rendering a TreeNode component for each node
        nodes.map((node) => <TreeNode key={node.id} node={node} />)
      ) : (
        // Displaying a message if there are no nodes in the tree
        <p className="text-gray-500">No nodes in the tree. Click "Add Node" to start.</p>
      )}
    </div>
  );
};

// Exporting the Tree component to be used in other parts of the application
export default Tree;
