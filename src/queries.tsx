import { db } from "./firebase";

export const postLikeQuery = (postId: string) =>
  db.collection("posts").doc(postId).collection("likes");
