import React from "react";
import CodeBlock from "./CodeBlock";

import "./List.css";

function List(props) {
  return (
    <div className="list_conteiner">
      <h1> Choose code block </h1>
      {props.items[0].map((c, i) => {
        return <CodeBlock data={c} socket={props.items[1]} index={i} />;
      })}
    </div>
  );
}

export default List;
