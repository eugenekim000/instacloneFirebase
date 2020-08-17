import React, { ReactElement } from "react";
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "firebase";
import "../styling/App.css";

interface Props {
  openSignIn: any;
  setOpenSignIn: any;
  setEmail: any;
  setPassword: any;
  email: any;
  password: any;
  signin: boolean;
  setUsername?: any;
  username?: string;
}

export default function AuthModal({
  openSignIn,
  setOpenSignIn,
  setEmail,
  setPassword,
  email,
  password,
  signin,
  setUsername,
  username,
}: Props): ReactElement {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user?.updateProfile({ displayName: username });
      })
      .catch((error) => alert(error.message));

    setOpenSignIn(() => false);
  };

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <Modal
      open={openSignIn}
      onClose={() => setOpenSignIn(false)}
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
          {!signin && (
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
          )}

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

          <Button
            onClick={(e) => (signin ? handleSignIn(e) : handleSignUp(e))}
            type="submit"
          >
            {signin ? "Sign in" : "Sign Up"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

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

// original sign in modal
{
  /* <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
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

            <Button onClick={(e) => handleSignIn(e)} type="submit">
              Sign in
            </Button>
          </form>
        </div>
      </Modal> */
}

{
  /* <div className="app-posts">
        {posts.map((post: Post) => (
          <Post
            {...post.post}
            key={post.id}
            postId={post.id}
            user={user}
          ></Post>
        ))}
      </div> */
}

//sign up modal

{
  /* <Modal
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
      </Modal> */
}
