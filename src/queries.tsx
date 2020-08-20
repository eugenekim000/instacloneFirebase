import { db } from "./firebase";

export const postLikeQuery = (postId: string) =>
  db.collection("posts").doc(postId).collection("likes");

export const userQuery = (username: string) =>
  db.collection("users").doc(username);
