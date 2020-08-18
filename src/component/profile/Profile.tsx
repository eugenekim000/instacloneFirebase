import React, { ReactElement, useEffect, useState } from "react";
import { Avatar, makeStyles, Button } from "@material-ui/core";
import "../../styling/Profile.css";
import { dummyImages } from "../../helper.js";
import { db } from "../../firebase";
import firebase from "firebase";

interface Props {
  props: any;
}

export default function Profile(props: any): ReactElement {
  const classes = useStyles();
  const dummy = dummyImages;

  const [username, setUsername] = useState("test");
  const [numPosts, setNumPosts] = useState(2);
  const [posts, setPosts] = useState([
    "https://preview.redd.it/fwpb1mkd5lh51.jpg?width=640&height=640&crop=smart&auto=webp&s=ca5d8790477580e981361fe7a6f805523b1281f5",
  ]);
  const [followers, setFollowers] = useState(1);
  const [following, setFollowing] = useState(4);
  const [profileDesc, setProfileDesc] = useState("this is a profile desc xD");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    console.log(props.match.params.username, "from profile!");

    let data = db
      .collection("users")
      .doc("uhnyeah")
      .get()
      .then((doc) => {
        console.log(doc.data());
      });
  }, []);

  // db
  //       .collection("posts")
  //       .doc(postId)
  //       .collection("comments")
  //       .orderBy("timestamp", "asc")
  //       .onSnapshot((snapshot) => {
  //         setcomments(snapshot.docs.map((doc) => doc.data()));
  //       });

  // find user name
  // -find posts
  // -find followers
  // -find following
  // -profile

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
        {posts.map((image) => (
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
