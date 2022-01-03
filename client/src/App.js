import React, { useContext } from "react";
import { ReactDOM } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Auth/Login";
import SignUp from "./Auth/Signup";
import Cookies from "js-cookie";
import { Provider, Context } from "./context/AuthContext";
import ListTodos from "./components/todos/ListTodos";
import Expense from "./Budget/Budget";
import Story from "./Stories/Story";

const App = () => {
  const { state } = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<SignUp />} />
        <Route path="/login" exact element={<SignIn />} />
        {state.isAuthenticated && (
          <Route path="/todos" exact element={<ListTodos />} />
        )}
        {state.isAuthenticated && (
          <Route path="/story" exact element={<Story />} />
        )}
        {state.isAuthenticated && (
          <Route path="/expense" exact element={<Expense />} />
        )}
        {!state.isAuthenticated && (
          <Route path="*" exact element={<SignUp />} />
        )}
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
