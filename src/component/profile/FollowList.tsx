import React, { ReactElement } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../../styling/Profile.css";

interface Props {}

export default function FollowList({}: Props): ReactElement {
  let username = "testusername";
  let avatar =
    "https://preview.redd.it/e4gmhupelki51.jpg?width=640&crop=smart&auto=webp&s=48114ff8202878edcfd1f19528e59855768eb7a5";

  return (
    <div className="follow-list-container">
      <Avatar src={avatar} style={{ height: "27px", width: "27px" }}></Avatar>
      <div className="follow-username">
        <p style={{ fontWeight: "bolder" }}>nabi - username</p>
        <p style={{ color: "grey" }}>nabi - name</p>
      </div>
      <button>Follow button</button>
    </div>
  );
}
