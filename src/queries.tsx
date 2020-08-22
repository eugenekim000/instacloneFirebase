import { db } from "./firebase";

export const postsQuery = (postId: string) =>
  db.collection("posts").doc(postId);

export const postLikeQuery = (postId: string) =>
  db.collection("posts").doc(postId).collection("likes");

export const postCommentsQuery = (postId: string) =>
  db.collection("posts").doc(postId).collection("comments");

export const userQuery = (username: string) =>
  db.collection("users").doc(username);

export const userPostQuery = (user: string, postId: string) =>
  db.collection("users").doc(user).collection("posts").doc(postId);

export const followingQuery = (user: string, username: string) =>
  userQuery(user).collection("following").doc(username);

export const followersQuery = (user: string, username: string) =>
  userQuery(username).collection("followers").doc(user);
