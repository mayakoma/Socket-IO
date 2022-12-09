import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./CodeBlock.css";

function CodeBlock(props) {
  const join_room = () => {
    props.socket.emit("join_code", props.data.id);
  };

  return (
    <Link to={`/code/${props.data.id}/${props.index}`} onClick={join_room}>
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
