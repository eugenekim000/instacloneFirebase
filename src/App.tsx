import React, { useState, useEffect } from "react";
import "./styling/App.css";
import { Post } from "./component/feed/Post";
import { db } from "./firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { auth } from "firebase";
import ImageUpload from "./component/feed/ImageUpload";
import Profile from "./component/profile/Profile";
import Explore from "./component/explore/Explore";
import AuthModal from "./component/AuthModal";
import EditProfilePage from "./component/settings/EditProfilePage";
import NotFound from "./component/NotFound";

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

  const FeedPage = () => {
    return (
      <>
        {user?.displayName ? (
          <>
            <ImageUpload username={user?.displayName}></ImageUpload>
            {posts.map((post: Post) => (
              <Post
                {...post.post}
                key={post.id}
                postId={post.id}
                user={user}
              ></Post>
            ))}
          </>
        ) : (
          <h3 className="image-upload-login">Please Log in to upload!</h3>
        )}
      </>
    );
  };

  return (
    <div className="App">
      <Router>
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
        <Switch>
          <Route exact path="/" component={FeedPage} />
          <Route path="/explore" component={Explore} />
          <Route exact path="/:username" component={Profile} />
          <Route path="/accounts/edit" component={EditProfilePage} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
