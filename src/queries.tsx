import { db } from "./firebase";

export const postLikeQuery = (postId: string) =>
  db.collection("posts").doc(postId).collection("likes");

export const userQuery = (username: string) =>
  db.collection("users").doc(username);

export const followingQuery = (user: string, username: string) =>
  userQuery(user).collection("following").doc(username);

export const followersQuery = (user: string, username: string) =>
  userQuery(username).collection("followers").doc(user);
