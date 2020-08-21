import React, { ReactElement, useEffect, useState, useContext } from "react";
import { FeedPost } from "../feed/FeedPost";
import { UserContext } from "../../App";
import { useHistory, Link } from "react-router-dom";
import { postsQuery } from "../../queries";
import { Post } from "./Post";

interface Props {}

export default function PostPage(props: any): ReactElement {
  const paramPostId = props.match.params.postid;
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
    console.log(paramPostId, "this is the post id");
  }, []);

  return (
    <>
      {render && (
        <div className="individual-post-page">
          <Post paramPostId={paramPostId}></Post>
        </div>
      )}
    </>
  );
}
