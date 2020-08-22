import React, { ReactElement } from "react";
import { Modal } from "@material-ui/core";
import "../styling/Modal.css";
import { useHistory } from "react-router-dom";

interface Props {
  open: boolean;
  setOption: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
  user: any;
  username: string;
}

let origin = window.location.origin;

export function OptionModal({
  open,
  setOption,
  postId,
  user,
  username,
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

  return (
    <Modal open={open} onClose={() => setOption(false)}>
      <div className="option-modal-container">
        <button onClick={handleRedirect}>Go to Post</button>
        <button onClick={handleCopy}>Copy Link</button>
        {ownerCheck && (
          <button style={{ color: "red", fontWeight: "bold" }}>
            Delete Post
          </button>
        )}
        <button onClick={() => setOption(false)}>Cancel</button>
      </div>
    </Modal>
  );
}
