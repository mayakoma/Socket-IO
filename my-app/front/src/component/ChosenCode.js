import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./ChosenCode.css";

function ChosenCode(props) {
  const indexCode = useParams().codeId;
  const indexRooms = useParams().i;
  const [editMode, setEditMode] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [receiveCode, setReceiveCode] = useState("");

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
  }, []);

  useEffect(() => {
    props.socket.on("receive_code", (data) => {
      setReceiveCode(data.code);
    });
  }, [props.socket, currentCode]);

  const editHandler = function () {
    setEditMode(!editMode);
  };
  const saveCode = async function () {
    if (currentCode.code !== "") {
      const data = {
        room: indexCode,
        code: currentCode.code,
      };
      await props.socket.emit("send_code", data);
    }
  };

  return (
    <>
      <div className="chosenCode">
        <div className="chosenCode_detailes">
          <h2 className="chosenCode_title">
            {`You are working on: ${currentCode.title}`}
          </h2>
          {canEdit ? (
            <button className="chosenCode_editBtn" onClick={editHandler}>
              start codding
            </button>
          ) : null}
        </div>
        {!editMode ? (
          <div className="chosenCode_code">
            {receiveCode.split(";").map((line) => {
              const l = `${line};`;
              return <h4>{`${l}`}</h4>;
            })}
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
