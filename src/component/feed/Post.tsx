import React, { useState, useEffect, useRef } from "react";
import "../../styling/Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { ReactComponent as UnlikeIcon } from "../../images/black-like.svg";
import { ReactComponent as LikeIcon } from "../../images/red-like.svg";
import { ReactComponent as ChatIcon } from "../../images/chat.svg";
import { postLikeQuery } from "../../queries";

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

  const textInput = useRef<HTMLInputElement>(null);

  const [comment, setComment] = useState("");
  const [postLikeNum, setPostLikeNum] = useState(0);
  const [likedState, setLikedState] = useState(false);

  useEffect(() => {
    postLikeQuery(postId)
      .doc(user.displayName)
      .get()
      .then((doc) => {
        console.log(doc, "inital render checking if user liked post");
        if (doc.exists) {
          setLikedState(true);
        }
      })
      .catch((err) => console.log(err));
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

    let getPostLikes = postLikeQuery(postId);
    getPostLikes
      .get()
      .then(
        (
          snapShot: firebase.firestore.QuerySnapshot<
            firebase.firestore.DocumentData
          >
        ) => {
          if (snapShot.empty) return;
          else {
            setPostLikeNum(snapShot.size);
            // setPostLikes(snapShot.docs.map((doc) => doc.data()));
          }
        }
      );

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

  const handleChatClick = () => {
    textInput.current?.focus();
  };

  const handleLikeClick = () => {
    //liking
    if (!likedState) {
      setPostLikeNum((prevState) => prevState + 1);
      setLikedState((prevState) => !prevState);
      postLikeQuery(postId).doc(user.displayName).set({ exists: true });
    } else {
      setPostLikeNum((prevState) => prevState - 1);
      setLikedState((prevState) => !prevState);
      postLikeQuery(postId).doc(user.displayName).delete();
    }
  };

  const displayPostLikes = (postLikeNum: number) => {
    console.log("display post likes", postId);
    if (postLikeNum > 1) return `${postLikeNum} likes`;
    else if (postLikeNum === 1) return "1 like";
    return "Be the first to like this";
  };

  return (
    <div className="post">
      <div className="post-header">
        <Avatar
          className="post-avatar"
          alt="user"
          src="https://i.redd.it/k2tlvc7inyg51.jpg"
        ></Avatar>

        <Link to={`/${username}`}>
          <h3> {username}</h3>
        </Link>
      </div>

      <img className="post-image" alt="post" src={image}></img>

      <div className="post-icons-container">
        <section className="post-icons">
          <button className="post-like-button" onClick={handleLikeClick}>
            {likedState ? (
              <LikeIcon style={{ height: 24, width: 24 }} />
            ) : (
              <UnlikeIcon style={{ height: 24, width: 24 }} />
            )}
          </button>

          <button className="post-chat-button" onClick={handleChatClick}>
            <ChatIcon style={{ height: 24, width: 24 }} />
          </button>
        </section>
      </div>

      <h4 className="post-text">
        <h4> {displayPostLikes(postLikeNum)}</h4>
        <Link to={`/${username}`}>
          <h3>
            {" "}
            <strong>{username}</strong>
          </h3>
        </Link>{" "}
        {caption}
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
