import React, { ReactElement, useEffect, useState, useContext } from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import {
  userQuery as userProfileQuery,
  allFollowingQuery,
  allFollowersQuery,
  userQuery,
} from "../../queries";
import "../../styling/Profile.css";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../App";
import { FollowButton } from "./FollowButton";
import HoverImg from "../HoverImg";
import { FollowModal } from "../modals/FollowModal";
import { storage } from "../../firebase";
import { ReactComponent as CameraIcon } from "../../images/camera.svg";

interface Props {
  props: any;
}

interface Posts {
  id: string;
  imageURL: string;
}

export default function Profile(props: any): ReactElement {
  const classes = useStyles();
  const history = useHistory();

  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [numPosts, setNumPosts] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState<any>([""]);
  const [followersUsers, setFollowerUsers] = useState<any>([]);
  const [followingUsers, setFollowingUsers] = useState<any>([]);
  const [profileDesc, setProfileDesc] = useState("this is a profile desc xD");
  const [avatar, setAvatar] = useState("");
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    let paramUsername = props.match.params.username;
    setUsername(paramUsername);

    userProfileQuery(paramUsername)
      .get()
      .then((docSnapshot) => {
        if (!docSnapshot.exists) {
          history.push("/account/notfound");
          return;
        }

        const data: any = docSnapshot.data();
        const { bio, website } = data;
        if (data.avatar) setAvatar(data.avatar);
        setProfileDesc(bio);
        setWebsite(website);
      });

    allFollowingQuery(paramUsername)
      .get()
      .then((docSnapshot) => {
        if (!docSnapshot.docs) {
          return;
        } else {
          console.log(
            docSnapshot.docs.map((doc) => doc.id),
            "following from profile component"
          );
          setFollowingUsers(docSnapshot.docs.map((doc) => doc.id));
        }
      });

    allFollowersQuery(paramUsername)
      .get()
      .then((docSnapshot) => {
        if (!docSnapshot.docs) {
          return;
        } else {
          setFollowerUsers(docSnapshot.docs.map((doc) => doc.id));
          setFollowers(docSnapshot.docs.length);
        }
      });

    userProfileQuery(paramUsername)
      .collection("posts")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs, "snapshot docs");
        setNumPosts(snapshot.docs.length);
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            imageURL: doc.data().image,
          }))
        );
      });
  }, []);

  const handleProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];

    const uploadTask = storage.ref(`avatars/${image!.name}`).put(image);

    uploadTask.on(
      "state_changed",
      () => {},
      (err: any) => console.log(err.message, "upload"),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setAvatar(url);
          user
            .updateProfile({
              photoURL: url,
            })
            .then(() => {
              userQuery(user.displayName).set({ avatar: user.photoURL });
              console.log(user.photoURL);
            })
            .catch((err: any) => console.log(err.message));
        });
      }
    );
  };

  return (
    <div className="profile-container">
      <FollowModal
        followData={followingUsers}
        openFollowing={openFollowing}
        setOpenFollowing={setOpenFollowing}
        followType="Following"
      />
      <FollowModal
        followData={followersUsers}
        openFollowing={openFollowers}
        setOpenFollowing={setOpenFollowers}
        followType="Followers"
      />
      <header className="profile-header">
        {username !== user.displayName ? (
          <div className="profile-avatar-container">
            <Avatar className={classes.large} src={avatar} />
          </div>
        ) : (
          <>
            <label
              htmlFor="edit-avatar"
              className="setting-username-input-label"
            >
              <Avatar className={classes.large} src={avatar} />
            </label>
            <input
              className="setting-username-input"
              id="edit-avatar"
              type="file"
              onChange={handleProfilePic}
              accept="image/png, image/jpeg"
            ></input>
          </>
        )}
        <section className="profile-description-container">
          <div className="profile-buttons">
            <h2>{username}</h2>
            {user &&
              (username === user.displayName ? (
                <>
                  <Link to="/accounts/edit">
                    <button className="profile-edit-button">
                      Edit Profile
                    </button>
                  </Link>
                </>
              ) : (
                user.displayName &&
                username && (
                  <FollowButton
                    user={user.displayName}
                    username={username}
                    setFollowers={setFollowers}
                  />
                )
              ))}
          </div>

          <div className="profile-stats">
            <p>{numPosts} posts</p>{" "}
            <p
              onClick={() => setOpenFollowers(true)}
              style={{ cursor: "pointer" }}
            >
              {followers} followers
            </p>{" "}
            <p
              onClick={() => setOpenFollowing(true)}
              style={{ cursor: "pointer" }}
            >
              {followingUsers.length} following
            </p>
          </div>
          <div>{profileDesc}</div>
          <a style={{ color: "#00376b" }} href={website}>
            {website}
          </a>
        </section>
      </header>
      <div className="profile-line"></div>

      <div className="profile-images">
        {posts[0] ? (
          posts.map(({ imageURL, id }: Posts) => (
            <HoverImg image={imageURL} id={id} username={username}></HoverImg>
          ))
        ) : (
          <>
            <div></div>
            <div className="profile-images-container">
              <div className="profile-images-wrapper">
                <CameraIcon />
                <h4>No Posts Yet</h4>
                <h6>When posted, you'll see photos here.</h6>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: "150px",
    height: "150px",
    ["@media (max-width:735px)"]: {
      width: "77px",
      height: "77px",
    },
  },
}));
