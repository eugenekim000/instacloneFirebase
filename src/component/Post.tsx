import React from "react";
import "../Post.css";
import Avatar from "@material-ui/core/Avatar";
import { Url } from "url";

interface Props {
  username: string;
  caption: string;
  imageURL?: Url;
}

export const Post = ({ username, caption, imageURL }: Props) => {
  return (
    <div className="post">
      <div className="post-header">
        <Avatar
          className="post-avatar"
          alt="user"
          src="https://i.redd.it/k2tlvc7inyg51.jpg"
        ></Avatar>
        <h3> {username}</h3>
      </div>

      <img
        className="post-image"
        alt="post"
        src="https://preview.redd.it/06h4b6zwdzg51.jpg?width=640&crop=smart&auto=webp&s=bf2b4bfa410e75a284c38f0adf73a656fc8e1cd0"
      ></img>
      <h4 className="post-text">
        {" "}
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
};
