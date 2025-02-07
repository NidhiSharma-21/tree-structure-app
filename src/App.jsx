// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import TreeNode from "./components/TreeNode";
import Toolbar from "./components/Toolbar";
import './index.css'

const App = () => {
  return (
    <Provider store={store}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <Toolbar />
        <TreeNode />
      </div>
    </Provider>
  );
};

export default App;
