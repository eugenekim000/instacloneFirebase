import React, { ReactElement, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../../styling/Profile.css";
import { FollowButton } from "../profile/FollowButton";
import { useHistory } from "react-router-dom";
import { userQuery } from "../../queries";

interface Props {
  followData: any;
}

export default function ModalList({ followData }: Props): ReactElement {
  const history = useHistory();
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    console.log(followData, "this is folllow data in follow list");

    let data: any;
    if (followData) {
      data = userQuery(followData)
        .get()
        .then((doc) => setUserData(doc.data()));
    }

    return () => data;
  }, []);

  return (
    <div className="follow-list-container">
      {Object.entries(userData).length > 0 && (
        <>
          <Avatar
            src={userData.avatar}
            style={{ height: "27px", width: "27px", cursor: "pointer" }}
            onClick={() => history.push(`/${followData}`)}
          ></Avatar>
          <div className="follow-username">
            <p
              style={{ fontWeight: "bolder", cursor: "pointer" }}
              onClick={() => history.push(`/${followData}`)}
            >
              {followData}
            </p>
            <p style={{ color: "grey" }}>{userData.name}</p>
          </div>
          <FollowButton user={"nyeah"} username={"nyeah"} />
        </>
      )}
    </div>
  );
}
