import React, { ReactElement, useState, useContext, useEffect } from "react";
import "../../styling/Settings.css";
import { Avatar, makeStyles } from "@material-ui/core";
import { useStyles } from "./EditProfilePage";
import { UserContext } from "../../App";
import { storage } from "../../firebase";
import { auth } from "firebase";

interface Props {}

export default function EditPublic({}: Props): ReactElement {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const user = useContext(UserContext);

  const classes = useStyles();

  const onChangeHandler = (
    e: any,
    setFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunc(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(user, "submit");
  };

  const handleProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];

    const uploadTask = storage.ref(`avatars/${image!.name}`).put(image);

    uploadTask.on(
      "state_changed",
      () => {},
      (err: any) => console.log(err.message, "upload"),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          user
            .updateProfile({
              photoURL: url,
            })
            .then(() => {
              console.log(user.photoURL);
            })
            .catch((err: any) => console.log(err.message));
        });
      }
    );
  };

  return (
    <div className="settings-input-container">
      <div className="setting-input-container">
        <Avatar className={classes.medium} src={user ? user.photoURL : ""} />
        <div className="setting-username">
          <div>{user ? user.displayName : ""}</div>
          <input
            className="setting-username-button"
            id="edit-avatar"
            type="file"
            onChange={handleProfilePic}
          />
        </div>
      </div>

      <form>
        <div className="setting-input-container">
          <label>Name</label>
          <input onChange={(e) => onChangeHandler(e, setName)}></input>
        </div>
        <div className="setting-input-container">
          <label>Username</label>
          <input onChange={(e) => onChangeHandler(e, setUserName)}></input>
        </div>
        <div className="setting-input-container">
          <label>Website</label>
          <input onChange={(e) => onChangeHandler(e, setWebsite)}></input>
        </div>
        <div className="setting-input-container">
          <label>Bio</label>
          <input onChange={(e) => onChangeHandler(e, setBio)}></input>
        </div>

        <div className="setting-input-container">
          <label></label>
          <div className="setting-notice">
            <h2>Personal Information</h2>
            <p>
              Personal Information Provide your personal information, even if
              the account is used for a business, a pet or something else. This
              won't be a part of your public profile.
            </p>
          </div>
        </div>
        <div className="setting-input-container">
          <label onChange={(e) => onChangeHandler(e, setEmail)}>Email</label>
          <input></input>
        </div>

        <div className="setting-input-container">
          <label></label>
          <button
            className="setting-input-container-submit-button"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
