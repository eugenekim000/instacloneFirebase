import React, { ReactElement, useState, useEffect, useContext } from "react";
import "../../styling/FollowButton.css";
import { followingQuery, followersQuery, newNotication } from "../../queries";
import { UserContext } from "../../App";
import firebase from "firebase";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

interface Props {
  user: string;
  username: string;
  setFollowers?: React.Dispatch<React.SetStateAction<number>>;
}

export const FollowButton = ({
  user,
  username,
  setFollowers,
}: Props): ReactElement => {
  const [render, setRender] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const userData = useContext(UserContext);
  const notificationData = {
    user: userData.displayName,
    username: username,
    photo: userData.photoURL,
  };

  useEffect(() => {
    if (user && username) {
      setRender(true);
      followingQuery(user, username)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
          setRender(false);
        })
        .catch((err: any) => console.log(err));
    }
  }, []);

  const handleFollow = (e: any) => {
    e.preventDefault();
    setRender(true);
    followingQuery(user, username)
      .set({ exist: true })
      .then(() =>
        followersQuery(user, username)
          .set({ exist: true })
          .then(() => {
            if (setFollowers) {
              setFollowers((prevState) => prevState + 1);
            }
            setIsFollowing(true);
          })
          .then(() => {
            let data = {
              ...notificationData,
              timestamp: firebase.firestore.Timestamp.now().seconds.toString(),
              type: "follow",
            };

            newNotication(data);
            setRender(false);
          })
          .catch((err: any) => {
            setRender(false);
            console.log(err.message);
          })
      )
      .catch((err: any) => {
        setRender(false);
        console.log(err.message);
      });
  };

  const handleUnFollow = (e: any) => {
    e.preventDefault();
    setRender(true);

    followingQuery(user, username)
      .delete()
      .then(() => {
        followersQuery(user, username)
          .delete()
          .then(() => {
            if (setFollowers) {
              setFollowers((prevState) => prevState - 1);
            }
            setIsFollowing(false);
            setRender(false);
          })
          .catch((err: any) => {
            setRender(false);
            console.log(err.message);
          });
      })
      .catch((err: any) => {
        setRender(false);
        console.log(err.message);
      });
  };

  return (
    <>
      {isFollowing ? (
        <button
          onClick={(e: any) => handleUnFollow(e)}
          className="unfollow-button"
          disabled={render ? true : false}
        >
          {render ? <BeatLoader size={5} color="black" /> : "Unfollow"}
        </button>
      ) : (
        <button
          onClick={(e: any) => handleFollow(e)}
          className="follow-button"
          disabled={render ? true : false}
        >
          {render ? <BeatLoader size={5} color="white" /> : "Follow"}
        </button>
      )}
    </>
  );
};
