import React, { useState, useEffect } from "react";
import "../styling/Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import firebase from "firebase";

interface Props {
  username: string;
  caption: string;
  image?: string;
  postId: string;
  user: any;
}

export const Post = ({ username, caption, image, postId, user }: Props) => {
  const [comments, setcomments] = useState<firebase.firestore.DocumentData[]>(
    []
  );

  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe: () => void;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setcomments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

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

      <div className="post-comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username} </strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post-comment-box">
          <input
            className="post-input"
            value={comment}
            type="text"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button
            className="post-button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
            style={{
              color: comment ? "rgba(var(--d69,0,149,246),1)" : "#6082a3",
            }}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};
