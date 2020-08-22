import React, { ReactElement, useEffect, useState } from "react";
import { Modal } from "@material-ui/core";
import { PostFetch } from "./post/PostFetch";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  url: string;
}

export default function PostModal({
  open,
  setOpen,
  id,
  url,
}: Props): ReactElement {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          window.history.replaceState(null, "New Page Title", `/${url}`);
          setOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal-post-container">
          <PostFetch paramPostId={id} />
        </div>
      </Modal>
    </div>
  );
}
