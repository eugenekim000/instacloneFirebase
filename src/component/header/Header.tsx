import "../../styling/App.css";
import React, { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { auth } from "firebase";
import { db } from "../../firebase";
import { ProfileDropdown } from "./ProfileDropdown";
import { UploadDropdown } from "./UploadDropdown";
import { NotificationDropdown } from "./NotificationDropDown";
import Badge from "@material-ui/core/Badge";

import { ReactComponent as Compass } from "../../images/compass-unselected.svg";
import { ReactComponent as User } from "../../images/user-unselected.svg";
import { ReactComponent as Camera } from "../../images/camera.svg";
import { ReactComponent as Heart } from "../../images/heart.svg";
import { ReactComponent as FullHeart } from "../../images/heart-black.svg";
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
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    let unsubscribe: any;

    unsubscribe = db
      .collection("users")
      .doc(user.displayName)
      .onSnapshot((snapshot: any) => {
        let data = snapshot.data();
        setNotification(data.notificationCount);
      });

    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    setHeartRender(true);
    db.collection("users")
      .doc(user.displayName)
      .update({ notificationCount: 0 });
  };

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

          <span>
            <Camera onClick={() => setCameraRender(true)} />
            {cameraRender && (
              <UploadDropdown
                setCameraRender={setCameraRender}
                username={user.displayName}
              />
            )}
          </span>

          <span className="header-heart-icon-container">
            <>
              {!heartRender && (
                <Badge badgeContent={notification} color="secondary">
                  <Heart
                    onClick={() => handleClick()}
                    className="header-heart-icon"
                  />
                </Badge>
              )}
            </>

            {heartRender && (
              <>
                <Badge badgeContent={notification} color="secondary">
                  <FullHeart className="header-heart-icon" />{" "}
                </Badge>
                <NotificationDropdown setHeartRender={setHeartRender} />
              </>
            )}
          </span>

          <span>
            <User onClick={() => setRender(true)} />
            {render && <ProfileDropdown setRender={setRender} />}
          </span>
        </div>
      </div>
    </div>
  );
}
