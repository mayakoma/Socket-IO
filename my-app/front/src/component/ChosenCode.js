import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import hljs from "highlight.js";
import "../../node_modules/highlight.js/styles/base16/circus.css";

import "./ChosenCode.css";

function ChosenCode(props) {
  // hljs.highlightAll();
  const indexCode = useParams().codeId;
  const indexRoom = useParams().i;
  const [editMode, setEditMode] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [receiveCode, setReceiveCode] = useState("");
  const [editTxt, setEditTxt] = useState("edit");

  const getList = async function (index) {
    fetch(`http://localhost:5000/code/get/${index}`)
      .then((res) => (res.ok ? res.json() : { currentCode: "" }))
      .then((data) => {
        setCurrentCode(data.code);
        setReceiveCode(data.code.code);
      });
  };

  useEffect(() => {
    getList(indexCode);
    hljs.highlightAll();
  }, []);

  // receive the code from the other socket
  useEffect(() => {
    props.socket.on("receive_code", (data) => {
      setReceiveCode(data.code);
    });
  }, [props.socket, currentCode]);

  // check if is the first connection or not - can edit or not.
  useEffect(() => {
    props.socket.on("edit_mood", (data) => {
      const [edit, sid] = data;
      if (sid == props.socket.id) {
        setCanEdit(edit);
      }
    });
  }, [props.socket]);

  //change the edit permition
  const editHandler = async function () {
    if (!editMode) {
      setEditTxt("finish");
    } else {
      setEditTxt("edit");
      const data = {
        room: indexCode,
        code: receiveCode,
      };
      await props.socket.emit("send_code", data);
    }
    setEditMode(!editMode);
  };

  // send the code to the other socket
  const saveCode = async function () {
    if (currentCode.code !== "") {
      const data = {
        room: indexCode,
        code: currentCode.code,
      };
      await props.socket.emit("send_code", data);
    }
  };
  const removeClient = async () => {
    await props.socket.emit("remove_client", {
      roomId: indexCode,
      roomIndex: indexRoom,
    });
  };

  return (
    <>
      <Link to="/">
        <button className="chosenCode_backBtn" onClick={removeClient}>
          back
        </button>
      </Link>
      <div className="chosenCode">
        <div className="chosenCode_detailes">
          <h2 className="chosenCode_title">{` ${currentCode.title}`}</h2>
          {canEdit ? (
            <button className="chosenCode_editBtn" onClick={editHandler}>
              {`${editTxt}`}
            </button>
          ) : null}
        </div>

        {!editMode ? (
          <div className="chosenCode_code">
            <pre>{receiveCode}</pre>
          </div>
        ) : (
          <textarea
            className="chosenCode_code_edit"
            type="text"
            defaultValue={currentCode.code}
            onChange={(event) => {
              currentCode.code = event.target.value;
              saveCode();
            }}
          />
        )}
      </div>
    </>
  );
}
export default ChosenCode;
