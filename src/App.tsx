import React from "react";
import "./App.css";
import { Post } from "./component/Post";

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <img
          className="app-header-image"
          alt="Instagram"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        ></img>
      </div>
      <Post username="huh" caption="caption1"></Post>
      <Post username="nyeah" caption="caption2"></Post>
      <Post username="hrng" caption="caption3"></Post>
    </div>
  );
}

export default App;
