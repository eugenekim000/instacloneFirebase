import React, { ReactElement } from "react";
import { Modal } from "@material-ui/core";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

export default function PostModal({ open, setOpen, id }: Props): ReactElement {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div> this is a modal div</div>
      </Modal>
    </div>
  );
}
