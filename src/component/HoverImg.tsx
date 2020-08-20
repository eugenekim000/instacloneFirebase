import React, { ReactElement } from "react";
import "../styling/Hover.css";
interface Props {
  image: string;
  id: string;
}

export default function HoverImg({ image, id }: Props): ReactElement {
  return (
    <div className="profile-image">
      <img src={image} alt="user-imag-off" className="post-image"></img>
      <div className="overlay">Content to be displayed on hover</div>
    </div>
  );
}
