import React from "react";
import CodeBlock from "./CodeBlock";

import "./List.css";

function List(props) {
  return (
    <div className="list_conteiner">
      <h1> Choose code block </h1>
      {props.items.map((c) => {
        return <CodeBlock data={c} />;
      })}
    </div>
  );
}

export default List;
