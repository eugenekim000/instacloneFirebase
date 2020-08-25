import { db } from "./firebase";
import firebase from "firebase";

export const allPostQuery = () => db.collection("posts");

export const allUserQuery = () => db.collection("users");

export const postsQuery = (postId: string) =>
  db.collection("posts").doc(postId);

export const postLikeQuery = (postId: string) =>
  db.collection("posts").doc(postId).collection("likes");

export const postCommentsQuery = (postId: string) =>
  db.collection("posts").doc(postId).collection("comments");

export const postCommentQuery = (postId: string, commentId: string) =>
  db.collection("posts").doc(postId).collection("comments").doc(commentId);

export const userQuery = (username: string) =>
  db.collection("users").doc(username);

export const userPostQuery = (user: string, postId: string) =>
  db.collection("users").doc(user).collection("posts").doc(postId);

export const allFollowingQuery = (user: string) =>
  userQuery(user).collection("following");

export const allFollowersQuery = (user: string) =>
  userQuery(user).collection("followers");

export const followingQuery = (user: string, username: string) =>
  userQuery(user).collection("following").doc(username);

export const followersQuery = (user: string, username: string) =>
  userQuery(username).collection("followers").doc(user);

export const newNotication = (data: any) => {
  userQuery(data.username).update({
    notificatonCount: firebase.firestore.FieldValue.increment(1),
  });
  userQuery(data.username).collection("notifications").add(data);
};
