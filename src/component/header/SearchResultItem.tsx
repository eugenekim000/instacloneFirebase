import React, { ReactElement, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../../styling/Profile.css";
import { useHistory } from "react-router-dom";

interface Props {
  foundUsers: {
    name: string | null;
    avatar: string;
    username: string | null;
  };
}

export function SearchResultItem({ foundUsers }: Props): ReactElement {
  const { username, name, avatar } = foundUsers;
  const history = useHistory();

  useEffect(() => {
    console.log(username, "username form search bar");
  }, []);

  return (
    <>
      {username ? (
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
      ) : (
        <div className="follow-list-container">No results found.</div>
      )}
    </>
  );
}
