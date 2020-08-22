import React, { ReactElement } from "react";
import { Modal } from "@material-ui/core";
import { db, storage } from "../../firebase";
import "../../styling/Modal.css";
import FollowList from "../profile/FollowList";

interface Props {
  openFollowing: boolean;
  setOpenFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  followType: string;
}

export function FollowModal({
  openFollowing,
  setOpenFollowing,
  followType,
}: Props): ReactElement {
  return (
    <Modal open={openFollowing} onClose={() => setOpenFollowing(false)}>
      <div className="follow-modal-container">
        <div className="follow-modal-header">{followType}</div>
        <div className="follows-list-container">
          <FollowList></FollowList>
          <FollowList></FollowList>
          <FollowList></FollowList>
          <FollowList></FollowList>
          <FollowList></FollowList>
          <FollowList></FollowList>
          <FollowList></FollowList>
          <FollowList></FollowList>
          <FollowList></FollowList>
        </div>
      </div>
    </Modal>
  );
}
