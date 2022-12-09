import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ChosenCode.css";
// import { Link } from "react-router-dom";

function ChosenCode(props) {
  const index = useParams().code;
  const code = props.data.find((p) => p.id == index);
  const [editMode, setEditMode] = useState(false);
  const [currentCode, setCurrentCode] = useState(code.code);

  const editHandler = function () {
    setEditMode(!editMode);
  };

  return (
    <>
      <div className="chosenCode">
        <div className="chosenCode_detailes">
          <h2 className="chosenCode_title">
            {`You are working on: ${code.title}`}
          </h2>
          <button className="chosenCode_editBtn" onClick={editHandler}></button>
        </div>
        {!editMode ? (
          <div className="chosenCode_code">{currentCode}</div>
        ) : (
          <input
            className="chosenCode_code_edit"
            type="textarea"
            defaultValue={currentCode}
          />
        )}
      </div>
    </>
  );
}
export default ChosenCode;
