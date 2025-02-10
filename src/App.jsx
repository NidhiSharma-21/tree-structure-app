// Import React library to create components
import React from "react"; 

// Import Provider from React Redux to provide the Redux store to the entire app
import { Provider } from "react-redux"; 

// Import the Redux store to manage global state
import store from "./redux/store"; 

// Import TreeView component to display the hierarchical tree structure
import TreeView from "./components/Tree"; 

// Import Toolbar component to provide additional controls for the tree
import Toolbar from "./components/Toolbar"; 

// Import global styles from index.css
import './index.css'; 
// Define the main App component
const App = () => {
  return (
    // Wrap the entire application in the Redux Provider to make the store available globally
    <Provider store={store}> 
      {/* Container div to center the app and set a max width */}
      <div className="max-w-4xl mx-auto mt-10"> 
        {/* Render the Toolbar component */}
        <Toolbar /> 
        {/* Render the TreeView component */}
        <TreeView /> 
      </div>
    </Provider>
  );
};

// Export the App component as the default export
export default App; 
