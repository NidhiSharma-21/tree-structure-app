// Import the `configureStore` function from Redux Toolkit to create a centralized store
import { configureStore } from "@reduxjs/toolkit"; 

// Import the treeReducer, which handles the state logic for the "tree" slice
import treeReducer from "./treeSlice"; 

// Create the Redux store using `configureStore`, which simplifies store setup
const store = configureStore({
  reducer: { // Define the reducers that will manage different slices of state
    tree: treeReducer, // Assign `treeReducer` to manage the "tree" slice of the state
  },
});

// Export the store so it can be used across the application (e.g., in a Provider)
export default store;
