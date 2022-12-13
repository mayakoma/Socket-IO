import React, { useCallback, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";

import LoadingSpinner from "./component/LoadingSpinner";
import ChosenCode from "./component/ChosenCode";
import List from "./component/List";
import { AuthContext } from "./context/auth-context";
import LoginForm from "./component/LoginForm";
import "./App.css";

const socket = io.connect("https://moveo-project-maya.herokuapp.com"); // client-socket

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const auth = useContext(AuthContext);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const getList = async function () {
    setIsLoading(true);
    fetch("https://moveo-project-maya.herokuapp.com/code/getList")
      .then((res) => (res.ok ? res.json() : { list: [] }))
      .then((data) => {
        setList(data.list);
      });
    setIsLoading(false);
  };
  //  when the page loaded asked for the code  list from the server
  useEffect(() => {
    getList();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        {isLoading ? (
          <LoadingSpinner asOverlay />
        ) : (
          <div className="App">
            <LoginForm />

            <Routes>
              <Route path="/" exact element={<List items={[list, socket]} />} />
              <Route
                path="/code/:codeId/:i"
                exact
                element={<ChosenCode socket={socket} data={list} />}
              />
            </Routes>
          </div>
        )}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
