import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Github } from "../../images/github.svg";
import { auth } from "firebase";
import { db } from "../../firebase";

interface Props {
  setUser: React.Dispatch<any>;
  user: any;
}

export default function SignUp({ setUser, user }: Props): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

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

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        if (authUser.displayName) {
          console.log(user, "this is the user - from header");
        } else {
          return authUser.updateProfile({ displayName: username });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    let usernameCheck = await checkUsernameAvail(username);
    if (!usernameCheck) {
      alert("username already taken!");
      return;
    }

    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        db.collection("users").doc(username).set({
          notificationCount: 0,
          profile: "",
          name: "",
          website: "",
          bio: "",
        });
        return authUser.user?.updateProfile({ displayName: username });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login-container">
      <div className="login-main-container">
        <section className="login-image-container">
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
        </section>
        <h3>Sign up to see photos and videos from your friends.</h3>

        <form className="login-input-forms">
          <div className="login-input-wrapper">
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            ></input>
          </div>
          <div className="login-input-wrapper">
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            ></input>
          </div>
          <div className="login-input-wrapper">
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            ></input>
          </div>
          <div className="login-input-wrapper">
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            ></input>
          </div>

          <button onClick={(e) => handleSignUp(e)} type="submit">
            Sign Up
          </button>

          <p className="login-disclaimer">
            By signing up, you agree to our Terms . Learn how we collect, use
            and share your data in our Data Policy and how we use cookies and
            similar technology in our Cookies Policy .
          </p>
        </form>
      </div>

      <section className="login-redirect">
        <div>
          Have an account?{" "}
          <Link to="/login" style={{ color: "#0095f6", fontWeight: "bold" }}>
            Login
          </Link>
        </div>
      </section>

      <section className="login-github">
        <Github
          style={{ height: "20px", width: "20px", marginRight: "10px" }}
        />
        <a href="https://github.com/eugenekim000/instacloneFirebase">
          View on GitHub
        </a>
      </section>
    </div>
  );
}
