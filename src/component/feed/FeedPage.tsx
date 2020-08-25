import React, { ReactElement, useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { PostRender } from "../post/PostRender";
import { allFollowingQuery, allPostQuery } from "../../queries";
interface Props {
  user: any;
  posts: any;
}

interface Post {
  image: string;
  username: string;
  caption: string;
  filename: string;
  postId: string;
  key: number;
}

export default function FeedPage({ user, posts }: Props): ReactElement {
  const [followingPost, setFollowingPost] = useState<any>([]);

  useEffect(() => {
    let object: any = {};
    //get following
    if (user) {
      allFollowingQuery(user.displayName)
        .get()
        .then((snapShot) => {
          snapShot.docs.map((doc) => (object[doc.id] = true));

          console.log(object, "object!!");
        }) //get posts that are contained in following
        .then(() => {
          allPostQuery()
            .orderBy("timestamp", "desc")
            .get()
            .then((snapshot) => {
              let dataArray: any = [];

              snapshot.docs.forEach((doc) => {
                let postId = doc.id;
                if (doc.data().username in object) {
                  let { username, caption, image, filename } = doc.data();

                  dataArray.push({
                    postId,
                    username,
                    caption,
                    image,
                    filename,
                  });
                }
              });

              setFollowingPost(dataArray);
            });
        });
    }
  }, [user]);

  return (
    <>
      {user?.displayName && followingPost.length ? (
        <>
          {followingPost.map((post: Post) => (
            <div className="feed-post-container">
              <PostRender
                username={post.username}
                caption={post.caption}
                image={post.image}
                filename={post.filename}
                key={post.postId}
                postId={post.postId}
                user={user}
              ></PostRender>
            </div>
          ))}
        </>
      ) : (
        <h3 className="feed-post-empty">
          Empty Feed...Check out the explore tab to follow people!
        </h3>
      )}
    </>
  );
}
