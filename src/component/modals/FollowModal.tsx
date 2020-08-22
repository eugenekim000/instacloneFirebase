import React, { ReactElement } from "react";
import { Modal } from "@material-ui/core";
import { db, storage } from "../../firebase";
import "../../styling/Modal.css";
import FollowList from "../profile/FollowList";

interface Props {
  openFollowing: boolean;
  setOpenFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FollowModal({
  openFollowing,
  setOpenFollowing,
}: Props): ReactElement {
  return (
    <Modal open={openFollowing} onClose={() => setOpenFollowing(false)}>
      <div className="follow-modal-container">
        <FollowList></FollowList>
        <FollowList></FollowList>
        <FollowList></FollowList>
      </div>
    </Modal>
  );
}
