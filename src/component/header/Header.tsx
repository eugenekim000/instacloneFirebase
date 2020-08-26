import "../../styling/App.css";
import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { auth } from "firebase";
import { ProfileDropdown } from "./ProfileDropdown";
import { UploadDropdown } from "./UploadDropdown";
import { NotificationDropdown } from "./NotificationDropDown";

import { ReactComponent as Compass } from "../../images/compass-unselected.svg";
import { ReactComponent as User } from "../../images/user-unselected.svg";
import { ReactComponent as Camera } from "../../images/camera.svg";
import { ReactComponent as Heart } from "../../images/heart.svg";
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
  const [render, setRender] = useState(false);
  const [cameraRender, setCameraRender] = useState(false);
  const [heartRender, setHeartRender] = useState(false);

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

          <>
            <Camera onClick={() => setCameraRender(true)} />
            {cameraRender && (
              <UploadDropdown
                setCameraRender={setCameraRender}
                username={user.displayName}
              />
            )}
          </>

          <>
            <Heart onClick={() => setHeartRender(true)} />
            {heartRender && (
              <NotificationDropdown setHeartRender={setHeartRender} />
            )}
          </>

          <>
            <User onClick={() => setRender(true)} />
            {render && <ProfileDropdown setRender={setRender} />}
          </>
        </div>
      </div>
    </div>
  );
}
