import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";

import ChosenCode from "./component/ChosenCode";

import List from "./component/List";
import "./App.css";

const socket = io.connect("http://localhost:5000"); // client-socket

function App() {
  const [list, setList] = useState([]);

  const getList = async function () {
    fetch("http://localhost:5000/code/getList")
      .then((res) => (res.ok ? res.json() : { list: [] }))
      .then((data) => {
        setList(data.list);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<List items={[list, socket]} />} />
          <Route
            path="/code/:codeId/:i"
            exact
            element={<ChosenCode socket={socket} data={list} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
