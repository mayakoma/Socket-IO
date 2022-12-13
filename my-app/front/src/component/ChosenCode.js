import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import hljs from "highlight.js";
import LoadingSpinner from "./LoadingSpinner";

import "../../node_modules/highlight.js/styles/base16/circus.css";
import "./ChosenCode.css";

function ChosenCode(props) {
  const indexCode = useParams().codeId; //code Id
  const indexRoom = useParams().i; // room number
  const [editMode, setEditMode] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [receiveCode, setReceiveCode] = useState("");
  const [editTxt, setEditTxt] = useState("edit");
  const [isLoading, setIsLoading] = useState(true);

  // get the code's details from the server
  const getList = async function (index) {
    setIsLoading(true);
    fetch(`https://moveo-project-maya.herokuapp.com/code/get/${index}`)
      .then((res) => (res.ok ? res.json() : { currentCode: "" }))
      .then((data) => {
        setCurrentCode(data.code);
        setReceiveCode(data.code.code);
      });
    setIsLoading(false);
  };
  // when the page loaded asked for the code's details
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
      // when the student finish the lesson, return to the original code
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

  // when press on back btn the client leave the page- -1 connection
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
        {isLoading ? (
          <LoadingSpinner asOverlay />
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
}
export default ChosenCode;
