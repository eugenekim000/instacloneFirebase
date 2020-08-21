import React, { ReactElement, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { postsQuery } from "./queries";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

export default function PostModal({ open, setOpen, id }: Props): ReactElement {
  useEffect(() => {
    // postsQuery(id).get();
    return () => {};
  }, []);

  const secondToLast = document.referrer.lastIndexOf(
    "/",
    document.referrer.lastIndexOf("/") - 1
  );
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          window.history.replaceState(
            null,
            "New Page Title",
            window.previousLocation
          );
          setOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div> this is a modal div</div>
      </Modal>
    </div>
  );
}
