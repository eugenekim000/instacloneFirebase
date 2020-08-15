import React, { useState } from "react";
import "../styling/Post.css";
import Avatar from "@material-ui/core/Avatar";

interface Props {
  username: string;
  caption: string;
  image?: string;
}

export const Post = ({ username, caption, image }: Props) => {
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

      <img className="post-image" alt="post" src={image}></img>
      <h4 className="post-text">
        {" "}
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
};
