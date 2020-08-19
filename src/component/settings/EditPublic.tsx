import React, { ReactElement, useState, useContext, useEffect } from "react";
import "../../styling/Settings.css";
import { Avatar, makeStyles } from "@material-ui/core";
import { useStyles } from "./EditProfilePage";
import { UserContext } from "../../App";
import { auth } from "firebase";

interface Props {}

export default function EditPublic({}: Props): ReactElement {
  const [avatarImg, setAvatarImg] = useState(
    "https://www.google.com/logos/doodles/2020/julius-lothar-meyers-190th-birthday-6753651837108694.2-l.png"
  );
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(user, "user from edit public!!");
  }, []);

  const classes = useStyles();

  const onChangeHandler = (
    e: any,
    setFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunc(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="settings-input-container">
      <div className="setting-input-container">
        <Avatar className={classes.medium} src={avatarImg} />
        <div className="setting-username">
          <div>{user ? user.displayName : ""}</div>
          <button className="setting-username-button">
            Change Profile Picture
          </button>
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
