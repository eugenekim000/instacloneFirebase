import React, { ReactElement } from "react";
import ImageUpload from "./ImageUpload";
import { Post } from "./Post";

interface Props {
  user: any;
  posts: any;
}

interface Post {
  post: {
    image: string;
    username: string;
    caption: string;
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
            <Post
              {...post.post}
              key={post.id}
              postId={post.id}
              user={user}
            ></Post>
          ))}
        </>
      ) : (
        <h3 className="image-upload-login">Please Log in to upload!</h3>
      )}
    </>
  );
}
