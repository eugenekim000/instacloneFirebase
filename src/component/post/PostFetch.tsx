import React, { ReactElement, useEffect, useState, useContext } from "react";
import { PostRender } from "../post/PostRender";
import { UserContext } from "../../App";
import { useHistory, Link } from "react-router-dom";
import { postsQuery } from "../../queries";
import Skeleton from "@material-ui/lab/Skeleton";

export function PostFetch({ paramPostId }: any): ReactElement {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [fileName, setFileName] = useState("");
  const [render, setRender] = useState(false);

  const history = useHistory();
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      postsQuery(paramPostId)
        .get()
        .then((snapShot: any) => {
          if (!snapShot.exists) {
            history.push("/posts/notfound");
            return;
          }
          const { username, image, caption, filename } = snapShot.data();
          setUsername(username);
          setImage(image);
          setCaption(caption);
          setFileName(filename);
        })
        .then(() => setRender(true))
        .catch((err: any) => console.log(err.message));
    }

    return () => {};
  }, [user]);

  return (
    <div>
      {render ? (
        <PostRender
          username={username}
          caption={caption}
          image={image}
          postId={paramPostId}
          user={user}
          filename={fileName}
        />
      ) : (
        <Skeleton variant="rect" width={500} height={500} animation="wave" />
      )}
    </div>
  );
}
