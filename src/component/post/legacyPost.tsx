import React, { ReactElement, useEffect, useState, useContext } from "react";
import { FeedPost } from "../feed/FeedPost";
import { UserContext } from "../../App";
import { useHistory, Link } from "react-router-dom";
import { postsQuery } from "../../queries";

export default function PostPage(props: any): ReactElement {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [render, setRender] = useState(false);

  const history = useHistory();
  const user = useContext(UserContext);
  const paramPostId = props.match.params.postid;

  useEffect(() => {
    console.log(user, "this is the user");
    if (user) {
      postsQuery(paramPostId)
        .get()
        .then((snapShot: any) => {
          if (!snapShot.exists) {
            history.push("/posts/notfound");
            return;
          }
          const { username, image, caption } = snapShot.data();
          setUsername(username);
          setImage(image);
          setCaption(caption);
        })
        .then(() => setRender(true))
        .catch((err: any) => console.log(err.message));
    }

    return () => {};
  }, [user]);

  return (
    <div>
      {render && (
        <FeedPost
          username={username}
          caption={caption}
          image={image}
          postId={paramPostId}
          user={user}
        />
      )}
    </div>
  );
}
