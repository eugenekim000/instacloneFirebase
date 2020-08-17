import React, { ReactElement, useState } from "react";
import "../../styling/Settings.css";
import { Avatar, makeStyles } from "@material-ui/core";

interface Props {}

const styleSelectedButton = {
  borderLeft: "1px solid #222",
  fontWeight: 550,
};
export default function EditProfilePage({}: Props): ReactElement {
  const classes = useStyles();
  const [edit, setEdit] = useState("edit");

  return (
    <div className="setting-grid">
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
            <div className="setting-input-container">
              <Avatar className={classes.medium} />
              <div className="setting-username">
                <div>UserName</div>
                <button className="setting-username-button">
                  Change Profile Picture
                </button>
              </div>
            </div>

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
                <label></label>
                <div className="setting-notice">
                  <h2>Personal Information</h2>
                  <p>
                    Personal Information Provide your personal information, even
                    if the account is used for a business, a pet or something
                    else. This won't be a part of your public profile.
                  </p>
                </div>
              </div>
              <div className="setting-input-container">
                <label>Email</label>
                <input></input>
              </div>

              <div className="setting-input-container">
                <label></label>
                <button className="setting-input-container-submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {edit === "changePW" && (
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
                <button className="setting-username-button">
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: "35px",
    height: "35px",
    justifySelf: "end",
  },
}));
