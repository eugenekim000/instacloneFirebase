import React, { ReactElement, useState, useEffect } from "react";
import { userQuery } from "../../queries";

interface Props {
  user: string;
  username: string;
}

export default function FollowButton({ user, username }: Props): ReactElement {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    let usernameRef = userQuery(user).collection("followers").doc(username);
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

  const handleUnFollow = () => {};

  const handleFollow = () => {};

  return (
    <>
      {isFollowing ? (
        <button onClick={handleUnFollow} className="unfollow-button">
          Unfollow
        </button>
      ) : (
        <button onClick={handleFollow} className="follow-button">
          Follow
        </button>
      )}
    </>
  );
}
