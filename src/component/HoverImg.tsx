import React, { ReactElement, useEffect, useState } from "react";
import { postCommentsQuery, postLikeQuery } from "./../queries";
import "../styling/Hover.css";
interface Props {
  image: string;
  id: string;
}

export default function HoverImg({ image, id }: Props): ReactElement {
  const [commentsNum, setCommentsNum] = useState(0);
  const [likesNum, setLikesNum] = useState(0);

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

  return (
    <div className="profile-image">
      <img src={image} alt="user-imag-off" className="post-image"></img>
      <div className="overlay">
        <div className="stats-container">
          {commentsNum && <div>comments: {commentsNum}</div>}
          {likesNum && <div>likes: {likesNum}</div>}
        </div>
      </div>
    </div>
  );
}
