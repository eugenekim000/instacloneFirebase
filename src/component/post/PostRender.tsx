import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import "../../styling/Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import firebase from "firebase";
import { Link, Redirect } from "react-router-dom";
import { ReactComponent as UnlikeIcon } from "../../images/black-like.svg";
import { ReactComponent as LikeIcon } from "../../images/red-like.svg";
import { ReactComponent as ChatIcon } from "../../images/chat.svg";
import { ReactComponent as MoreIcon } from "../../images/more.svg";
import {
  postLikeQuery,
  userQuery,
  postCommentQuery,
  newNotication,
} from "../../queries";
import { OptionModal } from "../modals/OptionModal";
import { LikeModal } from "../modals/LikeModal";

interface Props {
  username: string;
  caption: string;
  image?: string;
  postId: string;
  user: any;
  filename: string;
  setRender?: any;
}

export const PostRender = ({
  username,
  caption,
  image,
  postId,
  user,
  filename,
  setRender,
}: Props) => {
  const [comments, setcomments] = useState<firebase.firestore.DocumentData[]>(
    []
  );
  const textInput = useRef<HTMLInputElement>(null);
  const [comment, setComment] = useState("");
  const [postLikes, setPostLikes] = useState<any>([]);
  const [postLikeNum, setPostLikeNum] = useState(0);
  const [likedState, setLikedState] = useState(false);
  const [openLike, setOpenLike] = useState(false);
  const [postAvatar, setPostAvatar] = useState("");
  const [option, setOption] = useState(false);
  // const [render, setRender] = useState(false);

  useEffect(() => {
    postLikeQuery(postId)
      .doc(user.displayName)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setLikedState(true);
        }
      })
      .catch((err) => console.log(err));
    userQuery(username)
      .get()
      .then((doc) => {
        let data = doc.data();
        if (data?.avatar !== undefined) setPostAvatar(data.avatar);
      });
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
          setcomments(
            snapshot.docs.map((doc) => {
              let idObj = { id: doc.id };
              let data = doc.data();
              return { ...data, ...idObj };
            })
          );
        });
    }

    postLikeQuery(postId)
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
            setPostLikes(snapShot.docs.map((doc) => doc.id));
          }
          if (setRender) setRender(true);
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

    let notificationData = {
      username: username,
      user: user.displayName,
      photo: user.photoURL,
      type: "comment",
      content: comment,
      timestamp: firebase.firestore.Timestamp.now().seconds.toString(),
      postId: postId,
      postImage: image,
    };

    newNotication(notificationData);
  };

  const handleChatClick = () => {
    textInput.current?.focus();
  };

  const handleLikeClick = () => {
    if (!likedState) {
      let notificationData = {
        username: username,
        user: user.displayName,
        photo: user.photoURL,
        type: "like",
        timestamp: firebase.firestore.Timestamp.now().seconds.toString(),
        postId: postId,
        postImage: image,
      };

      newNotication(notificationData);
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
    if (postLikeNum > 1) return `${postLikeNum} likes`;
    else if (postLikeNum === 1) return "1 like";
    return "Be the first to like this";
  };

  const handleDeleteComment = (commentId: string) => {
    postCommentQuery(postId, commentId).delete();
  };

  return (
    <>
      {/* {render ? ( */}
      <div className="post">
        <OptionModal
          open={option}
          setOption={setOption}
          postId={postId}
          user={user}
          username={username}
          fileName={filename}
        ></OptionModal>

        {postLikes[0] ? (
          <LikeModal
            openLike={openLike}
            setOpenLike={setOpenLike}
            postLikesData={postLikes}
          ></LikeModal>
        ) : (
          <></>
        )}

        <div className="post-header">
          <Avatar className="post-avatar" alt="user" src={postAvatar}></Avatar>

          <Link to={`/${username}`}>
            <h3> {username}</h3>
          </Link>

          <div onClick={() => setOption(true)}>
            <MoreIcon
              style={{
                height: 14,
                width: 14,
                position: "absolute",
                right: "15px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        <img className="post-image" alt="post" src={image}></img>

        <div className="post-icons-container">
          <section className="post-icons">
            <button className="post-like-button" onClick={handleLikeClick}>
              {likedState ? (
                <motion.div
                  whileTap={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                  }}
                >
                  <LikeIcon style={{ height: 24, width: 24 }} />
                </motion.div>
              ) : (
                <motion.div
                  whileTap={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                  }}
                >
                  <UnlikeIcon style={{ height: 24, width: 24 }} />
                </motion.div>
              )}
            </button>

            <button className="post-chat-button" onClick={handleChatClick}>
              <ChatIcon style={{ height: 24, width: 24 }} />
            </button>
          </section>
        </div>

        <h4 className="post-text">
          <h4 onClick={() => setOpenLike(true)} className="post-likes">
            {displayPostLikes(postLikeNum)}
          </h4>
          <Link to={`/${username}`}>
            <h3>
              <strong>{username}</strong>
            </h3>
          </Link>{" "}
          {caption}
        </h4>

        <div className="post-comments">
          {comments.map((comment) => (
            <span className="post-comment">
              <p>
                <Link to={`/${comment.username}`}>
                  <strong>{comment.username} </strong>
                </Link>
                {comment.text}
              </p>
              {comment.username === user.displayName ? (
                <button onClick={() => handleDeleteComment(comment.id)}>
                  x
                </button>
              ) : (
                <></>
              )}
            </span>
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
      {/* ) : (
        <> </>
      )} */}
    </>
  );
};
