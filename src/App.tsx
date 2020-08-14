import React, { useState, useEffect } from "react";
import "./App.css";
import { Post } from "./component/Post";
import { db } from "./firebase";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Post {
  post: {
    image: string;
    username: string;
    caption: string;
  };
  id: number;
  key: number;
}

function App() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState<Partial<any>>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>y33t</h2>
        </div>
      </Modal>
      <button onClick={() => setOpen(true)}></button>
      <div className="app-header">
        <img
          className="app-header-image"
          alt="Instagram"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        ></img>
      </div>
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
