import React, { ReactElement, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../../styling/Profile.css";
import { FollowButton } from "./FollowButton";
import { useHistory } from "react-router-dom";
import { userQuery } from "../../queries";

interface Props {
  followData: any;
}

export default function FollowList({ followData }: Props): ReactElement {
  const history = useHistory();
  // let username = "testusername";
  // let avatar =
  //   "https://preview.redd.it/e4gmhupelki51.jpg?width=640&crop=smart&auto=webp&s=48114ff8202878edcfd1f19528e59855768eb7a5";
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
