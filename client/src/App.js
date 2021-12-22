import React, { useContext } from "react";
import { ReactDOM } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Auth/Login";
import SignUp from "./Auth/Signup";
import DashBoard from "./components/Dashboard";
import Cookies from "js-cookie";
import { Provider, Context } from "./context/AuthContext";
import ListTodos from "./components/todos/ListTodos";

import Story from "./Story";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<SignIn />} />
        <Route path="/dashboard" exact element={<DashBoard />} />
        <Route path="/todos" element={<ListTodos />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </Router>
  );
};

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
