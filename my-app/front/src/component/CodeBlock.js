import React from "react";
import { Link } from "react-router-dom";
import openSocket from "socket.io-client";

import "./CodeBlock.css";

function CodeBlock(props) {
  return (
    <Link to={`/${props.data.id}`}>
      <div className="codeBlock">
        <div className="codeBlock_title">
          <h4>{props.data.title}</h4>
        </div>
        <div className="codeBlock_code">{props.data.code}</div>
      </div>
    </Link>
  );
}
export default CodeBlock;
