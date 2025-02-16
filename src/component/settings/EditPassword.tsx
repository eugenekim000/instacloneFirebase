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

    if (user.displayName === "Guest") {
      alert("Please dont change the test credentials!");
      return;
    }

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

  const handleForgottenPW = (e: any) => {
    e.preventDefault();
    let confirmChoice = window.confirm("Send password rest email?");
    if (confirmChoice) {
      firebase
        .auth()
        .sendPasswordResetEmail(user.email)
        .then(() => {
          alert("Email has been sent!");
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="settings-input-container">
      <div className="setting-input-container">
        <Avatar className={classes.medium} src={user.photoURL} />
        <div className="setting-username">
          <div>{user.displayName}</div>
        </div>
      </div>

      <form>
        <div className="setting-input-container">
          <label>Old Password</label>
          <input
            type="password"
            onChange={(e) => onChangeHandler(e, setPassword)}
            placeholder={password}
            value={password}
          ></input>
        </div>
        <div className="setting-input-container">
          <label>New Password</label>
          <input
            type="password"
            onChange={(e) => onChangeHandler(e, setNewPassword)}
            placeholder={newPassword}
            value={newPassword}
          ></input>
        </div>
        <div className="setting-input-container">
          <label>Confirm New Password</label>
          <input
            type="password"
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
            Change Password
          </button>
        </div>

        <div className="setting-input-container">
          <label></label>
          <button
            className="setting-username-button"
            onClick={(e) => handleForgottenPW(e)}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}
