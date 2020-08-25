import React, { ReactElement } from "react";
import { Modal } from "@material-ui/core";
import "../styling/Modal.css";
import { useHistory } from "react-router-dom";
import { postsQuery, userPostQuery } from "../queries";
import { storage } from "../firebase";
import { motion } from "framer-motion";

interface Props {
  open: boolean;
  setOption: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
  user: any;
  username: string;
  fileName: string;
}

let origin = window.location.origin;
let currentLocation = window.location.href;

export function OptionModal({
  open,
  setOption,
  postId,
  user,
  username,
  fileName,
}: Props): ReactElement {
  const history = useHistory();
  const ownerCheck = username === user.displayName;

  const handleRedirect = () => {
    history.push(`/post/${postId}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${origin}/post/${postId}`);
    setOption(false);
  };

  const handleDelete = () => {
    postsQuery(postId).delete();
    userPostQuery(user.displayName, postId).delete();

    storage
      .ref("images")
      .child(fileName)
      .delete()
      .then(() => {
        console.log("success!");
        if (origin === currentLocation) {
          return;
        } else {
          history.push(`/${user.displayName}`);
        }

        setOption(false);
      })
      .catch((err: any) => {
        console.log(err.message);
        setOption(false);
      });
  };

  return (
    <Modal
      open={open}
      onClose={() => setOption(false)}
      className="generic-modal-container"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.05 }}
        className="option-modal-container"
      >
        {/* <div className="option-modal-container"> */}
        <button onClick={handleRedirect}>Go to Post</button>
        <button onClick={handleCopy}>Copy Link</button>
        {ownerCheck && (
          <button
            style={{ color: "red", fontWeight: "bold" }}
            onClick={handleDelete}
          >
            Delete Post
          </button>
        )}
        <button onClick={() => setOption(false)}>Cancel</button>
        {/* </div> */}
      </motion.div>
    </Modal>
  );
}
