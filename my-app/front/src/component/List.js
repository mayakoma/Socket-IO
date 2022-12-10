import React, { useContext } from "react";
import CodeBlock from "./CodeBlock";
import { AuthContext } from "../context/auth-context";
import "./List.css";

function List(props) {
  const logoutHandler = function () {
    auth.logout();
  };
  const auth = useContext(AuthContext);
  return (
    <>
      {auth.isLoggedIn && (
        <>
          <div className="list_conteiner">
            <div className="list_header">
              <h1> Choose code block </h1>
              <button className="app_logoutBtn" onClick={logoutHandler}>
                logout
              </button>
            </div>
            {props.items[0].map((c, i) => {
              return <CodeBlock data={c} socket={props.items[1]} index={i} />;
            })}
          </div>
        </>
      )}
    </>
  );
}

export default List;
