import React, { ReactElement, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { db, storage } from "../../firebase";
import "../../styling/Modal.css";
import ModalList from "../modals/ModalList";
import { ReactComponent as PersonIcon } from "../../images/group.svg";
import { motion } from "framer-motion";
import Skeleton from "@material-ui/lab/Skeleton";

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
    return () => {};
  }, []);

  return (
    <Modal
      open={openFollowing}
      onClose={() => setOpenFollowing(false)}
      className="generic-modal-container"
    >
      <>
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.05 }}
          className="option-modal-container"
        >
          <div className="follow-modal-header">{followType}</div>
          {followData.length ? (
            <div className="follows-list-container">
              {followData.map((data) => (
                <ModalList followData={data}></ModalList>
              ))}
            </div>
          ) : (
            <div className="follow-list-empty">
              <PersonIcon />
              <h4>People who follow the user</h4>
              <h6>Once somebody follows the user, you'll see them here</h6>
            </div>
          )}
        </motion.div>
      </>
    </Modal>
  );
}
