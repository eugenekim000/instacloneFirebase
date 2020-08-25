import React, { ReactElement, useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, Link } from "react-router-dom";
import { postsQuery } from "../../queries";
import { PostFetch } from "./PostFetch";

interface Props {}

export default function PostPage(props: any): ReactElement {
  const paramPostId = props.match.params.postid;
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <>
      {render && (
        <div className="individual-post-page">
          <PostFetch paramPostId={paramPostId}></PostFetch>
        </div>
      )}
    </>
  );
}
