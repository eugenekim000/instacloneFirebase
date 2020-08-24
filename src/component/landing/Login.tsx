import React, { ReactElement } from "react";
import "../../styling/Landing.css";

interface Props {}

export default function Login({}: Props): ReactElement {
  return (
    <div className="login-container">
      <section className="image-container">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
      </section>

      <form className="login-input-forms">
        <input placeholder="Email"></input>
        <input placeholder="Password"></input>
        <button>log in</button>
      </form>

      <p>forgot password?</p>

      <section>
        <div>Don't have an account? Sign up</div>
      </section>
    </div>
  );
}
