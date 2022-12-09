import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ChosenCode from "./component/ChosenCode";
import List from "./component/List";
import "./App.css";

const DUMMY_ARRAY = [
  {
    id: "1",
    title: "code 1",
    code: "blabla",
  },
  {
    id: "2",
    title: "code 2",
    code: "blabla",
  },
  {
    id: "3",
    title: "code 3",
    code: "blabla",
  },
  {
    id: "4",
    title: "code 4",
    code: "blabla",
  },
];

function App() {
  useEffect(() => {
    const requestOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data =fetch("http://localhost:5000/code/getList", requestOption);
    console.log(data);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<List items={DUMMY_ARRAY} />} />
          <Route path="/:code" element={<ChosenCode data={DUMMY_ARRAY} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
