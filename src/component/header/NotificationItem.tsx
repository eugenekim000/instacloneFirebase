import React, { ReactElement } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../../styling/Profile.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FollowButton } from "../profile/FollowButton";

interface Props {
  notification: any;
}

export function NotificationItem({ notification }: Props): ReactElement {
  const history = useHistory();
  const { photo, type, user, username } = notification;

  const renderSwitch = (param: string) => {
    switch (param) {
      case "like":
        return `liked your photo.`;

      case "comment":
        return `commented: ${notification.content}`;

      case "follow":
        return `started following you.`;
      default:
        return "";
    }
  };

  return (
    <>
      {user ? (
        <div className="notification-list-container">
          <div className="notification-info">
            <Link to={`/${user}`}>
              <Avatar
                src={photo}
                style={{ height: "27px", width: "27px", cursor: "pointer" }}
                onClick={() => history.push(`/${user}`)}
              ></Avatar>
            </Link>
            <div className="notification-username">
              <Link to={`/${user}`}>
                <p style={{ fontWeight: "bolder", cursor: "pointer" }}>
                  {user}
                </p>
              </Link>
              <p>{renderSwitch(notification.type)}</p>
            </div>
          </div>

          {type === "comment" || type === "like" ? (
            <span className="notification-rightside">
              <Link to={`/post/${notification.postId}`}>
                <img
                  alt="post that was liked"
                  src={notification.postImage}
                ></img>
              </Link>
            </span>
          ) : (
            <span className="notification-rightside">
              <FollowButton user={username} username={user} />
            </span>
          )}
        </div>
      ) : (
        <div className="follow-list-container">No notifications.</div>
      )}
    </>
  );
}
