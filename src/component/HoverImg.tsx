import React, { ReactElement, useEffect, useState } from "react";
import { postCommentsQuery, postLikeQuery } from "./../queries";
import "../styling/Hover.css";
import { ReactComponent as HeartIcon } from "../images/heart-black.svg";
import { ReactComponent as ChatIcon } from "../images/chat-black.svg";
import PostModal from "../PostModal";
interface Props {
  image: string;
  id: string;
}

export default function HoverImg({ image, id }: Props): ReactElement {
  const [commentsNum, setCommentsNum] = useState(0);
  const [likesNum, setLikesNum] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(image, id, "this is from the hoving compnent");
    if (image && id) {
      postCommentsQuery(id)
        .get()
        .then((snapShot) => {
          console.log(snapShot, "snapshot post comments query");
          if (!snapShot.empty) setCommentsNum(snapShot.size);
        })
        .catch((err: any) => console.log(err.message));

      postLikeQuery(id)
        .get()
        .then((snapShot) => {
          console.log(snapShot, "snapshot  setLikesNum query");

          if (!snapShot.empty) setLikesNum(snapShot.size);
        })
        .catch((err: any) => console.log(err.message));
    }
  }, []);

  const handleClick = () => {
    console.log("clicked!");
    setOpen(true);
  };

  return (
    <div className="profile-image">
      <img src={image} alt="user-imag-off" className="post-image"></img>
      <div className="overlay" onClick={handleClick}>
        <div className="stats-container">
          {commentsNum > 0 && (
            <>
              <ChatIcon className="hover-icon" />{" "}
              <span className="hover-stat-chat">{commentsNum}</span>
            </>
          )}
          {likesNum > 0 && (
            <>
              <HeartIcon className="hover-icon" />{" "}
              <span className="hover-stat-heart">{likesNum}</span>
            </>
          )}
        </div>
      </div>

      <PostModal open={open} setOpen={setOpen} id={id}></PostModal>
    </div>
  );
}
