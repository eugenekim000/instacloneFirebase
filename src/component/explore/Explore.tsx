import React, { ReactElement, useEffect, useState } from "react";
import "../../styling/Explore.css";
import Skeleton from "@material-ui/lab/Skeleton";
import { allPostQuery } from "../../queries";
import { shuffle } from "../../helper";
import HoverImg from "../HoverImg";

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
                username: doc.data().username,
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
      {render ? (
        <div className="explore-images-container">
          <div className="explore-images">
            {posts.map(({ username, id, image }: any) => (
              <HoverImg username={username} id={id} image={image} />
            ))}
          </div>
        </div>
      ) : (
        <div className="explore-images-container-empty">
          <div className="explore-images-empty">
            <Skeleton variant="rect" />
            <Skeleton variant="rect" />
            <Skeleton variant="rect" />
            <Skeleton variant="rect" />
            <Skeleton variant="rect" />
            <Skeleton variant="rect" />
          </div>
        </div>
      )}
    </>
  );
}
