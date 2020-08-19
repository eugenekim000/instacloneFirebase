import React, { ReactElement } from "react";
import "../../styling/Settings.css";
import { Avatar, makeStyles } from "@material-ui/core";
import { useStyles } from "./EditProfilePage";

interface Props {}

export default function ({}: Props): ReactElement {
  const classes = useStyles();
  return (
    <div className="settings-input-container">
      <div className="setting-input-container">
        <Avatar className={classes.medium} />
        <div className="setting-username">
          <div>UserName</div>
        </div>
      </div>

      <form>
        <div className="setting-input-container">
          <label>Old Password</label>
          <input></input>
        </div>
        <div className="setting-input-container">
          <label>New Password</label>
          <input></input>
        </div>
        <div className="setting-input-container">
          <label>Confirm New Password</label>
          <input></input>
        </div>

        <div className="setting-input-container">
          <label></label>
          <button className="setting-input-container-submit-button">
            Submit
          </button>
        </div>

        <div className="setting-input-container">
          <label></label>
          <button className="setting-username-button">Forgot Password?</button>
        </div>
      </form>
    </div>
  );
}
