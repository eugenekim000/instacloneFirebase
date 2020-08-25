import React, { ReactElement, useState, useEffect } from "react";
import "../../styling/FollowButton.css";
import { userQuery, followingQuery, followersQuery } from "../../queries";

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

  useEffect(() => {
    if (user && username) {
      followingQuery(user, username)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("iam following!!");
            setIsFollowing(true);
          } else {
            console.log("i am not following", doc.data());
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
