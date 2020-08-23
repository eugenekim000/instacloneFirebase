import React, { ReactElement, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { db, storage } from "../../firebase";
import "../../styling/Modal.css";
import FollowList from "../profile/FollowList";

interface Props {
  openFollowing: boolean;
  setOpenFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  followType: string;
  followData: string[];
}

export function FollowModal({
  openFollowing,
  setOpenFollowing,
  followType,
  followData,
}: Props): ReactElement {
  useEffect(() => {
    console.log(followData, "this is the follow data passed!!");
    return () => {};
  }, []);

  return (
    <Modal open={openFollowing} onClose={() => setOpenFollowing(false)}>
      <div className="follow-modal-container">
        <div className="follow-modal-header">{followType}</div>
        <div className="follows-list-container">
          {followData.map((data) => (
            <FollowList followData={data}></FollowList>
          ))}
        </div>
      </div>
    </Modal>
  );
}
