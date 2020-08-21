import React, { ReactElement } from "react";
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "firebase";
import "../styling/App.css";
import { db } from "../firebase";

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

  const checkUsernameAvail = async (checkName: string | undefined) => {
    let userQuery = await db.collection("users").doc(checkName);

    let check = userQuery.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        return false;
      } else {
        return true;
      }
    });

    return check;
  };

  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    let usernameCheck = await checkUsernameAvail(username);
    if (!usernameCheck) {
      console.log(usernameCheck, "usernamecheck");
      alert("username already taken!");
      return;
    }

    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        db.collection("users").doc(username).set({
          followersNum: 0,
          followingNum: 0,
          profile: "",
        });
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
