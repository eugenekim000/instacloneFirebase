import React, { ReactElement } from "react";
import { dummyImages } from "../../helper.js";
import "../../styling/Explore.css";
interface Props {}

export default function Explore({}: Props): ReactElement {
  return (
    <div className="explore-images-container">
      <div className="explore-images">
        {dummyImages.map((image) => (
          <div className="explore-image">
            <img src={image}></img>
          </div>
        ))}
      </div>
    </div>
  );
}
