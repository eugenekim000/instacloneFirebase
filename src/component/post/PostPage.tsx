import React, { ReactElement, useEffect, useState, useContext } from "react";
import { Post } from "../feed/Post";
import { UserContext } from "../../App";
import { useHistory, Link } from "react-router-dom";
import { postsQuery } from "../../queries";

export default function PostPage(props: any): ReactElement {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");

  const history = useHistory();
  const user = useContext(UserContext);
  const paramPostId = props.match.params.postid;

  useEffect(() => {
    postsQuery(paramPostId)
      .get()
      .then((snapShot: any) => {
        const { username, image, caption } = snapShot.data();
      });

    return () => {};
  }, []);
  return (
    <div>
      <Post
        username={username}
        caption={caption}
        image={image}
        postId={paramPostId}
        user={user}
      />
    </div>
  );
}
