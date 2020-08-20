import React, { ReactElement, useState, useEffect } from "react";
import { userQuery } from "../../queries";

interface Props {
  user: string;
  username: string;
}

export default function FollowButton({ user, username }: Props): ReactElement {
  const [isFollowing, setIsFollowing] = useState(false);
  let usernameRef = userQuery(user).collection("following").doc(username);
  let usernameFollowersRef = userQuery(username)
    .collection("followers")
    .doc(user);

  useEffect(() => {
    usernameRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      })
      .catch((err: any) => console.log(err));
  }, []);

  const handleFollow = (e: any) => {
    e.preventDefault();
    console.log("handle follow");
    usernameRef
      .set({ exist: true })
      .then(() =>
        usernameFollowersRef
          .set({ exist: true })
          .then(() => setIsFollowing(true))
          .catch((err: any) => console.log(err.message))
      )
      .catch((err: any) => console.log(err.message));
  };

  const handleUnFollow = (e: any) => {
    e.preventDefault();
    usernameRef
      .delete()
      .then(() => {
        usernameFollowersRef
          .delete()
          .then(() => {
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
}
