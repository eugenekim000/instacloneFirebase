import React, { ReactElement, useEffect, useState, useContext } from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import { userQuery as userProfileQuery } from "../../queries";
import "../../styling/Profile.css";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../App";
import FollowButton from "./FollowButton";
import HoverImg from "../HoverImg";

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
  const [posts, setPosts] = useState<any>([""]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [profileDesc, setProfileDesc] = useState("this is a profile desc xD");
  const [avatar, setAvatar] = useState("");

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
        const { followersNum, followingNum, bio, website } = data;
        if (data.avatar) setAvatar(data.avatar);
        setFollowers(followersNum ? followersNum : 0);
        setFollowing(followingNum ? followingNum : 0);
        setProfileDesc(bio);
        setWebsite(website);
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

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-avatar-container">
          <Avatar className={classes.large} src={avatar} />
        </div>
        <section className="profile-description-container">
          <div className="profile-buttons">
            <h2>{username}</h2>
            {user &&
              (username === user.displayName ? (
                <>
                  <Link to="/accounts/edit">
                    <button>Edit Profile</button>
                  </Link>
                  <button>log out</button>
                </>
              ) : (
                user.displayName && (
                  <FollowButton
                    user={user.displayName}
                    username={username}
                    setFollowers={setFollowers}
                  />
                )
              ))}
          </div>

          <div className="profile-stats">
            <p>{numPosts} posts</p> <p>{followers} followers</p>{" "}
            <p>{following} following</p>
          </div>
          <div>{profileDesc}</div>
          <div>{website}</div>
        </section>
      </header>
      <div className="profile-line"></div>

      <div className="profile-images">
        {posts[0] &&
          posts.map(({ imageURL, id }: Posts) => (
            <HoverImg image={imageURL} id={id} username={username}></HoverImg>
          ))}
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
