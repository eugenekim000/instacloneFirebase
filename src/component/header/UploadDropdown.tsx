import React, {
  ReactElement,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";

interface Props {
  setCameraRender: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
}

export function UploadDropdown({
  setCameraRender,
  username,
}: Props): ReactElement {
  const myRef: any = useRef();
  const handleClickOutside = (e: any) => {
    if (!myRef.current!.contains(e.target)) {
      setCameraRender(false);
    }
  };

  const [image, setImage] = useState<any>("");
  const [imagePrev, setImagePrev] = useState<any>("");
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const user = useContext(UserContext);

  const history = useHistory();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      setImage(file);
      setImagePrev(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpload = () => {
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    const currentTime = firebase.firestore.Timestamp.now().seconds.toString();
    const fileName = image!.name + currentTime;
    const uploadTask = storage.ref(`images/${fileName}`).put(image);

    let imageURL: string;

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      (error) => {
        console.log("error is happening on uploadtask.on");
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(fileName)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts")
              .add({
                timestamp: currentTime,
                caption: caption,
                image: url,
                username: username,
                filename: fileName,
              })
              .then((docRef) => {
                imageURL = docRef.id;
                db.collection("users")
                  .doc(username)
                  .collection("posts")
                  .doc(docRef.id)
                  .set({ image: url, timestamp: currentTime });
              })
              .then(() => {
                setProgress(0);
                setCaption("");
                setImage("");
                setImagePrev("");
                history.push(`/post/${imageURL}`);
              });
          });
      }
    );
  };

  return (
    <span ref={myRef} className="profile-dropdown-container">
      <div
        className="profile-dropdown-wrapper-upload"
        style={{ height: "170px", width: "200px" }}
      >
        <div className="dropdown-item-file">
          <>
            {!imagePrev ? (
              <label className="dropdown-inputfile-label" htmlFor="file">
                Choose a file...
              </label>
            ) : (
              <label className="dropdown-inputfile-label" htmlFor="file">
                <img src={imagePrev} alt="selected file by the user!"></img>
              </label>
            )}
            <input
              name="file"
              id="file"
              type="file"
              className="dropdown-inputfile"
              onChange={handleChange}
              accept="image/png, image/jpeg"
            />
          </>
        </div>
        <div className="dropdown-item-caption">
          <textarea
            placeholder="Write a caption..."
            maxLength={100}
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
          ></textarea>
        </div>
        <div className="dropdown-item-button-wrapper">
          <button onClick={handleUpload} disabled={progress ? true : false}>
            {progress === 0 ? (
              " Upload!"
            ) : (
              <LinearProgress variant="determinate" value={progress} />
            )}
          </button>
        </div>
      </div>
    </span>
  );
}
