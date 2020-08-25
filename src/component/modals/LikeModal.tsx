import "../../styling/Modal.css";
import React, { ReactElement, useEffect, useState } from "react";
import { Modal } from "@material-ui/core";
import { motion } from "framer-motion";

import { userQuery } from "../../queries";
import ModalList from "./ModalList";
import { ReactComponent as PersonIcon } from "../../images/group.svg";

interface Props {
  openLike: boolean;
  setOpenLike: React.Dispatch<React.SetStateAction<boolean>>;
  postLikesData: any;
}

export function LikeModal({
  openLike,
  setOpenLike,
  postLikesData,
}: Props): ReactElement {
  const [userData, setUserData] = useState<any>([]);

  return (
    <Modal
      open={openLike}
      onClose={() => setOpenLike(false)}
      className="generic-modal-container"
    >
      <>
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.05 }}
          className="option-modal-container"
        >
          <div className="follow-modal-header">Likes</div>
          <div className="follows-list-container">
            {postLikesData.map((data: any) => (
              <ModalList followData={data}></ModalList>
            ))}
          </div>
        </motion.div>
      </>
    </Modal>
  );
}
