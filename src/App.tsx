import React, { useState, useEffect } from "react";
import "./App.css";
import { Post } from "./component/Post";
import { db } from "./firebase";
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "firebase";

interface Post {
  post: {
    image: string;
    username: string;
    caption: string;
  };
  id: number;
  key: number;
}

type E = React.MouseEvent<HTMLButtonElement, MouseEvent>;

type User = firebase.User;

function App() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState<Partial<any>>([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser, "dope");
        setUser(authUser);
        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({ displayName: username });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user?.updateProfile({ displayName: username });
      })
      .then(() => setOpen(() => false))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="App">
      <div className="app-header">
        <img
          className="app-header-image"
          alt="Instagram"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        ></img>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <img
            className="app-header-image"
            alt="Instagram"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          ></img>

          <form className="app-signup">
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>

            <Button onClick={(e) => handleSignUp(e)} type="submit">
              Sign up
            </Button>
          </form>
        </div>
      </Modal>
      {user ? (
        <Button onClick={() => auth().signOut()}>Sign Out</Button>
      ) : (
        <div className="app-login-container">
          <Button onClick={() => setOpen(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      {posts.map((post: Post) => (
        <Post {...post.post} key={post.id}></Post>
      ))}
    </div>
  );
}

export default App;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
