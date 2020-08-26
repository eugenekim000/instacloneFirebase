import React, { ReactElement, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../../styling/Profile.css";
import { FollowButton } from "../profile/FollowButton";
import { useHistory } from "react-router-dom";
import { userQuery } from "../../queries";
import { Link } from "react-router-dom";
interface Props {
  followData: any;
}

export default function ModalList({ followData }: Props): ReactElement {
  const history = useHistory();
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
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
          <Link to={`/${followData}`}>
            <Avatar
              src={userData.avatar}
              style={{ height: "27px", width: "27px", cursor: "pointer" }}
            ></Avatar>
          </Link>
          <div className="follow-username">
            <Link to={`/${followData}`}>
              <p style={{ fontWeight: "bolder", cursor: "pointer" }}>
                {followData}
              </p>
            </Link>
            <p style={{ color: "grey" }}>{userData.name}</p>
          </div>
          <FollowButton user={"nyeah"} username={"nyeah"} />
        </>
      )}
    </div>
  );
}
