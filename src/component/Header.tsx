import React, { ReactElement, useEffect, useState } from "react";
import "../styling/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { auth } from "firebase";
import { db } from "../firebase";
import AuthModal from "./AuthModal";

interface Props {
  setPosts: any;
  setUser: any;
  user: any;
}

export default function Header({
  setPosts,
  setUser,
  user,
}: Props): ReactElement {
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log("app render");
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    console.log("render");
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
    <div className="app-header">
      <Link to="/">
        <img
          className="app-header-image"
          alt="Instagram"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        ></img>
      </Link>

      {user ? (
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
      )}

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
    </div>
  );
}
