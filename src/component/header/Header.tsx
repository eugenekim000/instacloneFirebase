import "../../styling/App.css";
import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { auth } from "firebase";
import { ProfileDropdown } from "./ProfileDropdown";

import { ReactComponent as Compass } from "../../images/compass-unselected.svg";
import { ReactComponent as User } from "../../images/user-unselected.svg";
import { ReactComponent as Camera } from "../../images/camera.svg";
import SearchBar from "./SearchBar";

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
  const [render, setRender] = useState(false);

  return (
    <div className="app-header">
      <div className="app-header-content">
        <Link to="/">
          <img
            className="app-header-image"
            alt="Instagram"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          ></img>
        </Link>

        <SearchBar />

        <div className="header-icon-container">
          <Link to="/explore">
            <Compass />
          </Link>

          <Camera />

          {/* <Link to={user ? `/${user.displayName}` : ""}> */}
          <>
            <User onClick={() => setRender(true)} />
            {render && <ProfileDropdown />}
          </>
        </div>
        {/* 
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
        )} */}
      </div>
    </div>
  );
}
