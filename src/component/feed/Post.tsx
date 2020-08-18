import React, { useState, useEffect, useRef } from "react";
import "../../styling/Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { ReactComponent as UnlikeIcon } from "../../images/black-like.svg";
import { ReactComponent as ChatIcon } from "../../images/chat.svg";
interface Props {
  username: string;
  caption: string;
  image?: string;
  postId: string;
  user: any;
}

const blackEmoji =
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/71/black-heart_1f5a4.png";
const chatEmoji =
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/60/microsoft/54/speech-balloon_1f4ac.png";

export const Post = ({ username, caption, image, postId, user }: Props) => {
  const [comments, setcomments] = useState<firebase.firestore.DocumentData[]>(
    []
  );

  const textInput = useRef<HTMLInputElement>(null);

  const [comment, setComment] = useState("");
  useEffect(() => {
    console.log("rerendering post component");
  }, []);

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
      console.log("rerendering post Id");
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

  const handleClick = () => {
    textInput.current?.focus();
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

      <div className="post-icons-container">
        <section className="post-icons">
          <span className="post-like-button">
            <UnlikeIcon style={{ height: 24, width: 24 }} />
          </span>
          <span></span>
          <button className="post-chat-button" onClick={handleClick}>
            <ChatIcon style={{ height: 24, width: 24 }} />
          </button>
        </section>
      </div>

      <h4 className="post-text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post-comments">
        {comments.map((comment) => (
          <p>
            <Link to={`/${comment.username}`}>
              <strong>{comment.username} </strong>
            </Link>
            {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post-comment-box">
          <input
            ref={textInput}
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
