import React, { ReactElement, useState, useContext } from "react";
import "../../styling/Settings.css";
import { Avatar, makeStyles } from "@material-ui/core";
import { useStyles } from "./EditProfilePage";
import { UserContext } from "../../App";
import firebase from "firebase";

interface Props {}

export default function ({}: Props): ReactElement {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeHandler = (
    e: any,
    setFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunc(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords need to match!");
      return;
    }

    let userAuth = firebase.auth().currentUser;

    let credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    userAuth?.reauthenticateWithCredential(credentials).then(
      () => {
        user
          .updatePassword(newPassword)
          .then(() => alert("Password has been updated!"))
          .catch((err: any) => alert(err.message));
      },
      (err: any) => {
        alert(err.message);
      }
    );
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="settings-input-container">
      <div className="setting-input-container">
        <Avatar className={classes.medium} src={user.photoURL} />
        <div className="setting-username">
          <div>UserName</div>
        </div>
      </div>

      <form>
        <div className="setting-input-container">
          <label>Old Password</label>
          <input
            onChange={(e) => onChangeHandler(e, setPassword)}
            placeholder={password}
            value={password}
          ></input>
        </div>
        <div className="setting-input-container">
          <label>New Password</label>
          <input
            onChange={(e) => onChangeHandler(e, setNewPassword)}
            placeholder={newPassword}
            value={newPassword}
          ></input>
        </div>
        <div className="setting-input-container">
          <label>Confirm New Password</label>
          <input
            onChange={(e) => onChangeHandler(e, setConfirmPassword)}
            placeholder={confirmPassword}
            value={confirmPassword}
          ></input>
        </div>

        <div className="setting-input-container">
          <label></label>
          <button
            className="setting-input-container-submit-button"
            onClick={(e) => handlePasswordChange(e)}
          >
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
