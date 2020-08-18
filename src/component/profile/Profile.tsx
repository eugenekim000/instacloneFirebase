import React, { ReactElement, useEffect, useState } from "react";
import { Avatar, makeStyles, Button } from "@material-ui/core";
import "../../styling/Profile.css";
import { dummyImages } from "../../helper.js";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

interface Props {
  props: any;
}

export default function Profile(props: any): ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const dummy = dummyImages;

  const [username, setUsername] = useState("test");
  const [numPosts, setNumPosts] = useState(0);
  const [posts, setPosts] = useState<any>([""]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [profileDesc, setProfileDesc] = useState("this is a profile desc xD");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    console.log(props.match.params.username, "from profile!");

    let paramUsername = props.match.params.username;

    let userDataQuery = db.collection("users").doc(paramUsername);

    let userStats = userDataQuery.get().then((docSnapshot) => {
      if (!docSnapshot.exists) {
        history.push("/account/notfound");
        return;
      }
      console.log(docSnapshot.data());
      console.log("loading after history");
      const data: any = docSnapshot.data();
      const { followersNum, followingNum, profile } = data;
      setFollowers(followersNum);
      setFollowing(followingNum);
      setProfileDesc(profile);
    });

    let userPosts = userDataQuery
      .collection("posts")
      .get()
      .then((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return doc.data().image;
          })
        );
      })
      .then(() => setNumPosts(posts.length));

    let userFollowing;
    let userFollowers;
  }, []);

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-avatar-container">
          <Avatar className={classes.large} src={avatar} />
        </div>
        <section className="profile-description-container">
          <div className="profile-buttons">
            <h2>{username}</h2>
            <button>Edit Profile</button>
            <button>log out</button>
          </div>

          <div className="profile-stats">
            <p>{numPosts} posts</p> <p>{followers} followers</p>{" "}
            <p>{following} following</p>
          </div>
          <div>{profileDesc}</div>
        </section>
      </header>
      <div className="profile-line"></div>

      <div className="profile-images">
        {posts.map((image: string) => (
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
    ["@media (max-width:735px)"]: {
      width: "77px",
      height: "77px",
    },
  },
}));
