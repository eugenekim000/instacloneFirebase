import React, { ReactElement, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../../styling/Profile.css";
import { FollowButton } from "../profile/FollowButton";
import { useHistory } from "react-router-dom";
import { userQuery } from "../../queries";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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
      {Object.entries(userData).length > 0 ? (
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
      ) : (
        <>
          <Box display="flex" alignItems="center">
            <Box margin={1}>
              <Skeleton variant="circle" width={24} height={24}>
                <Avatar />
              </Skeleton>
            </Box>
            <Box>
              <Skeleton variant="rect" width={180} height={10} />
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}
