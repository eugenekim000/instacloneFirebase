import React, { ReactElement, useEffect, useState } from "react";
import "../../styling/Explore.css";
import { allPostQuery } from "../../queries";
import { shuffle } from "../../helper";

interface Props {}

export default function Explore({}: Props): ReactElement {
  const [posts, setPosts] = useState<any>([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    allPostQuery()
      .orderBy("timestamp", "asc")
      .limit(10)
      .get()
      .then((snapShot) => {
        setPosts(
          shuffle(
            snapShot.docs.map((doc) => {
              return {
                image: doc.data().image,
                id: doc.id,
              };
            })
          )
        );
      })
      .then(() => setRender(true));
  }, []);

  return (
    <>
      {render && (
        <div className="explore-images-container">
          <div className="explore-images">
            {posts.map((post: any) => (
              <div className="explore-image">
                <img
                  src={post.image}
                  key={post.id}
                  alt="post in explore feed"
                ></img>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
