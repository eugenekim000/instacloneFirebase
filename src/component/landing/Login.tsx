import React, { ReactElement, useState, useEffect } from "react";
import "../../styling/Landing.css";
import { Link } from "react-router-dom";
import { auth } from "firebase";
import { ReactComponent as Github } from "../../images/github.svg";

interface Props {
  setUser: React.Dispatch<any>;
  user: any;
}

export default function Login({ user, setUser }: Props): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("render login, user username");
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);

        if (authUser.displayName) {
          console.log(user, "this is the user - from login");
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login-container">
      <div className="login-main-container">
        <section className="login-image-container">
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
        </section>

        <form className="login-input-forms">
          <div className="login-input-wrapper">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="login-input-wrapper">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <button onClick={(e) => handleSignIn(e)} type="submit">
            Log in
          </button>
        </form>

        <p>Forgot password?</p>
      </div>

      <section className="login-pw-recover-container">
        <div>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#0095f6", fontWeight: "bold" }}>
            Sign up
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
