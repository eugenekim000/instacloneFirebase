import React, { ReactElement } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../../styling/Profile.css";
import { useHistory } from "react-router-dom";

interface Props {
  foundUsers: {
    name: string;
    avatar: string;
    username: string;
  };
}

export function SearchResultItem({ foundUsers }: Props): ReactElement {
  const { username, name, avatar } = foundUsers;
  const history = useHistory();
  // let username = "testusername";
  // let avatar =
  //   "https://preview.redd.it/e4gmhupelki51.jpg?width=640&crop=smart&auto=webp&s=48114ff8202878edcfd1f19528e59855768eb7a5";

  return (
    <>
      {username && (
        <div className="follow-list-container">
          <Avatar
            src={avatar}
            style={{ height: "27px", width: "27px", cursor: "pointer" }}
            onClick={() => history.push(`/${username}`)}
          ></Avatar>
          <div className="follow-username">
            <p
              style={{ fontWeight: "bolder", cursor: "pointer" }}
              onClick={() => history.push(`/${username}`)}
            >
              {username}
            </p>
            <p style={{ color: "grey" }}>{name}</p>
          </div>
        </div>
      )}
    </>
  );
}
