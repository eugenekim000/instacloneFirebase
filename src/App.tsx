import React, { useState, useEffect } from "react";
import "./styling/App.css";
import { Post } from "./component/Post";
import { db } from "./firebase";
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "firebase";
import ImageUpload from "./component/ImageUpload";
import Profile from "./component/profile/Profile";
import Explore from "./component/explore/Explore";
import AuthModal from "./component/AuthModal";
import Settings from "./component/settings/Settings";

interface Post {
  post: {
    image: string;
    username: string;
    caption: string;
  };
  id: string;
  key: number;
}

type User = string;

function App() {
  const [posts, setPosts] = useState<Partial<any>>([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser, "dope");

        setUser(authUser);

        console.log(user, "has been set!");
        if (authUser.displayName) {
          console.log(user);
          console.log(user.displayName, "displayname!!!");
        } else {
          return authUser.updateProfile({ displayName: username });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  return (
    <div className="App">
      <div className="app-header">
        <img
          className="app-header-image"
          alt="Instagram"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        ></img>

        <AuthModal
          openSignIn={open}
          setOpenSignIn={setOpen}
          setEmail={setEmail}
          setPassword={setPassword}
          setUsername={setUsername}
          email={email}
          password={password}
          username={username}
          signin={false}
        ></AuthModal>

        <AuthModal
          openSignIn={openSignIn}
          setOpenSignIn={setOpenSignIn}
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
          signin={true}
        ></AuthModal>

        {/* upload component */}
        {/* {user ? (
          <Button
            onClick={() =>
              auth()
                .signOut()
                .then(() => setUser(null))
            }
          >
            Sign Out
          </Button>
        ) : (
          <div className="app-login-container">
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          </div>
        )} */}
      </div>
      {/* {user?.displayName ? (
        <ImageUpload username={user?.displayName}></ImageUpload>
      ) : (
        <h3 className="image-upload-login">Please Log in to upload!</h3>
      )} */}

      {/* posts on feed */}
      {posts.map((post: Post) => (
        <Post {...post.post} key={post.id} postId={post.id} user={user}></Post>
      ))}

      {/* 
      <Profile></Profile> */}
      {/* <Explore></Explore> */}

      {/* Setting page */}
      {/* <Settings></Settings> */}
    </div>
  );
}

export default App;
