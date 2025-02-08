// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import TreeView from "./components/Tree";
import Toolbar from "./components/Toolbar";
import './index.css'

const App = () => {
  return (
    <Provider store={store}>
      <div className="max-w-4xl mx-auto mt-10">
      <Toolbar />
      <TreeView />
    </div>
    </Provider>
  );
};

export default App;
