import React, { ReactElement, useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { PostRender } from "../post/PostRender";
import { allFollowingQuery, allPostQuery } from "../../queries";
import Skeleton from "@material-ui/lab/Skeleton";

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
  const [render, setRender] = useState(false);

  useEffect(() => {
    //get following
    if (user.displayName) {
      const currUser = user.displayName;
      let object: any = {};
      object[currUser] = true;

      console.log(object, "current user!");
      allFollowingQuery(currUser)
        .get()
        .then((snapShot) => {
          snapShot.docs.map((doc) => (object[doc.id] = true));
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
              setRender(true);
            });
        });
    }
  }, [user]);

  return (
    <>
      {!render && (
        <div className="feed-post-container">
          <Skeleton variant="rect" width={"500px"} height={"500px"} />
        </div>
      )}

      {render && followingPost.length ? (
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
        render && (
          <h3 className="feed-post-empty" style={{ fontWeight: 300 }}>
            Empty Feed...Check out the explore tab to follow people!
          </h3>
        )
      )}
    </>
  );
}
