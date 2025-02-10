// Import React library to create and manage components
import React from "react";

// Import ReactDOM for rendering the React application to the DOM
import ReactDOM from "react-dom/client";

// Import the main App component, which serves as the entry point of the application
import App from "./App";

// Import global CSS styles to apply styling across the application
import './index.css';

// Import Provider from React Redux to make the Redux store accessible throughout the app
import { Provider } from "react-redux";

// Import the Redux store, which holds the global state of the application
import store from "./redux/store";

// Import global styles again (this line is redundant since it's already imported above)
import './index.css';

// Create the root React element and render the application inside the element with id "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  // Use StrictMode to help identify potential problems in the application during development
  <React.StrictMode>
    {/* Wrap the entire application in the Redux Provider to ensure all components have access to the store */}
    <Provider store={store}>
      {/* Render the main App component */}
      <App />
    </Provider>
  </React.StrictMode>,
);
