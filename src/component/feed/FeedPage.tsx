import React, { ReactElement } from "react";
import ImageUpload from "./ImageUpload";
import { PostRender } from "../post/PostRender";

interface Props {
  user: any;
  posts: any;
}

interface Post {
  post: {
    image: string;
    username: string;
    caption: string;
    fileName: string;
  };
  id: string;
  key: number;
}

export default function FeedPage({ user, posts }: Props): ReactElement {
  return (
    <>
      {user?.displayName ? (
        <>
          <ImageUpload username={user?.displayName}></ImageUpload>
          {posts.map((post: Post) => (
            <div className="feed-post-container">
              <PostRender
                {...post.post}
                key={post.id}
                postId={post.id}
                user={user}
              ></PostRender>
            </div>
          ))}
        </>
      ) : (
        <h3 className="image-upload-login">Please Log in to upload!</h3>
      )}
    </>
  );
}
