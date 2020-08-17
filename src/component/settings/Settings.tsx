import React, { ReactElement, useState } from "react";
import "../../styling/Settings.css";

interface Props {}

const styleSelectedButton = {
  borderLeft: "1px solid #222",
  fontWeight: 550,
};
export default function Settings({}: Props): ReactElement {
  const [edit, setEdit] = useState("edit");

  return (
    <div className="settings-container">
      <div className="settings-tabs">
        <button
          onClick={() => setEdit("edit")}
          style={edit === "edit" ? styleSelectedButton : undefined}
        >
          Edit Profile
        </button>
        <button
          onClick={() => setEdit("changePW")}
          style={edit === "changePW" ? styleSelectedButton : undefined}
        >
          {" "}
          Change Password
        </button>
      </div>
      {edit === "edit" && (
        <div className="settings-input-container">
          <form>
            <div className="setting-input-container">
              <label>Name</label>
              <input></input>
            </div>
            <div className="setting-input-container">
              <label>Username</label>
              <input></input>
            </div>
            <div className="setting-input-container">
              <label>Website</label>
              <input></input>
            </div>
            <div className="setting-input-container">
              <label>Bio</label>
              <input></input>
            </div>
            <div className="setting-input-container">
              <label>Email</label>
              <input></input>
            </div>
          </form>
        </div>
      )}

      {edit === "changePW" && (
        <div className="settings-input-container">
          <form>
            <div className="setting-input-container">
              <label>change pw</label>
              <input></input>
            </div>
            <div className="setting-input-container">
              <label>change pw</label>
              <input></input>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
