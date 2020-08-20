import React, {
  ReactElement,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { userQuery, userProfileQuery } from "../../queries";
import { Avatar, makeStyles } from "@material-ui/core";
import { useStyles } from "./EditProfilePage";
import { UserContext } from "../../App";
import { storage, db } from "../../firebase";
import { auth } from "firebase";
import "../../styling/Settings.css";

interface Props {}

export default function EditPublic({}: Props): ReactElement {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const user = useContext(UserContext);
  const inputRef = useRef<any>();
  const classes = useStyles();

  useEffect(() => {
    if (user && user.displayName) {
      setEmail(user.email);
      setUserName(user.displayName);
      userProfileQuery(user.displayName)
        .get()
        .then((docs) => {
          let data = docs.data();
          console.log(data, "edit public useeffect");
          if (data) {
            let { bio, website, name } = data;
            setBio(bio);
            setWebsite(website);
            setName(name);
          }
        });
    }
  }, [user]);

  const onChangeHandler = (
    e: any,
    setFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunc(e.target.value);
  };

  const handleClick = (e: any) => {
    inputRef.current.click();
  };

  const handleProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];

    const uploadTask = storage.ref(`avatars/${image!.name}`).put(image);

    uploadTask.on(
      "state_changed",
      () => {},
      (err: any) => console.log(err.message, "upload"),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!userName) return;

    db.collection("users")
      .doc(userName)
      .get()
      .then((snapshot) => {
        // user
        //   .updateProfile({ displayName: userName })
        //   .catch((err: any) => alert(err.message));

        userProfileQuery(user.displayName).update({
          website,
          bio,
          name,
        });

        user
          .updateEmail(email)
          .then(() => {
            alert("update sucessful!");
            console.log(user);
          })
          .catch((err: any) => alert(err.message));
      })
      .catch((err: any) => err.message);

    console.log(email, "this is email");
    console.log(user, "submit");
  };

  return (
    <div className="settings-input-container">
      <div className="setting-input-container">
        <Avatar className={classes.medium} src={user ? user.photoURL : ""} />
        <div className="setting-username">
          <div>{user ? user.displayName : ""}</div>
          <button className="setting-username-button" onClick={handleClick}>
            Change Profile Photo
          </button>
          <input
            ref={inputRef}
            className="setting-username-input"
            id="edit-avatar"
            type="file"
            onChange={handleProfilePic}
          />
        </div>
      </div>

      <form>
        <div className="setting-input-container">
          <label>Name</label>
          <input
            onChange={(e) => onChangeHandler(e, setName)}
            placeholder={name}
            value={name}
          ></input>
        </div>
        {/* <div className="setting-input-container">
          <label>Username</label>
          <input
            onChange={(e) => onChangeHandler(e, setUserName)}
            placeholder={user ? user.displayName : ""}
            value={userName}
          ></input>
        </div> */}
        <div className="setting-input-container">
          <label>Website</label>
          <input
            onChange={(e) => onChangeHandler(e, setWebsite)}
            placeholder={website}
            value={website}
          ></input>
        </div>
        <div className="setting-input-container">
          <label>Bio</label>
          <input
            onChange={(e) => onChangeHandler(e, setBio)}
            placeholder={bio}
            value={bio}
          ></input>
        </div>

        <div className="setting-input-container">
          <label></label>
          <div className="setting-notice">
            <h2>Personal Information</h2>
            <p>
              Personal Information Provide your personal information, even if
              the account is used for a business, a pet or something else. This
              won't be a part of your public profile.
            </p>
          </div>
        </div>
        <div className="setting-input-container">
          <label>Email</label>
          <input
            onChange={(e) => onChangeHandler(e, setEmail)}
            value={email}
            placeholder={email}
          ></input>
        </div>

        <div className="setting-input-container">
          <label></label>
          <button
            className="setting-input-container-submit-button"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
