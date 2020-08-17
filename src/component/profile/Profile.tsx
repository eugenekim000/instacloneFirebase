import React, { ReactElement } from "react";
import { Avatar, makeStyles, Button } from "@material-ui/core";
import "../../styling/Profile.css";
import { dummyImages } from "../../helper.js";

interface Props {}

export default function Profile({}: Props): ReactElement {
  const classes = useStyles();
  const dummy = dummyImages;

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-avatar-container">
          <Avatar className={classes.large} />
        </div>
        <section className="profile-description-container">
          <div className="profile-buttons">
            <h2>Username</h2>
            <button>Edit Profile</button>
            <button>log out</button>
          </div>

          <div className="profile-stats">
            <p>posts</p> <p>followers</p> <p>following</p>
          </div>
          <div>description</div>
        </section>
      </header>
      <div className="profile-line"></div>

      <div className="profile-images">
        {dummy.map((image) => (
          <div className="profile-image">
            <img src={image}></img>
          </div>
        ))}
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
  large: {
    width: "150px",
    height: "150px",
  },
}));
