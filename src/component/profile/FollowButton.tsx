import React, { ReactElement, useState, useEffect, useContext } from "react";
import "../../styling/FollowButton.css";
import {
  userQuery,
  followingQuery,
  followersQuery,
  newNotication,
} from "../../queries";
import { UserContext } from "../../App";
import firebase from "firebase";

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
  const [isFollowing, setIsFollowing] = useState(false);
  const userData = useContext(UserContext);
  const notificationData = {
    user: userData.displayName,
    username: username,
    photo: userData.photoURL,
  };

  useEffect(() => {
    if (user && username) {
      followingQuery(user, username)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
        })
        .catch((err: any) => console.log(err));
    }
  }, []);

  const handleFollow = (e: any) => {
    e.preventDefault();

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

            console.log(data, "data from follow!!");

            newNotication(data);
          })
          .catch((err: any) => console.log(err.message))
      )
      .catch((err: any) => console.log(err.message));
  };

  const handleUnFollow = (e: any) => {
    e.preventDefault();
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
          })
          .catch((err: any) => console.log(err.message));
      })
      .catch((err: any) => console.log(err.message));
  };

  return (
    <>
      {isFollowing ? (
        <button
          onClick={(e: any) => handleUnFollow(e)}
          className="unfollow-button"
        >
          Unfollow
        </button>
      ) : (
        <button onClick={(e: any) => handleFollow(e)} className="follow-button">
          Follow
        </button>
      )}
    </>
  );
};
