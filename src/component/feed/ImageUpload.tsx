import React, { ReactElement, useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import "../../styling/ImageUpload.css";

interface Props {
  username: string | undefined;
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export default function ImageUpload({ username }: Props): ReactElement {
  const [image, setImage] = useState<any>(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      setImage(file);
    }
  };

  const handleUpload = () => {
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    const currentTime = firebase.firestore.Timestamp.now().seconds.toString();

    const fileName = image!.name + currentTime;

    const uploadTask = storage.ref(`images/${fileName}`).put(image);

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
                db.collection("users")
                  .doc(username)
                  .collection("posts")
                  .doc(docRef.id)
                  .set({ image: url, timestamp: currentTime });
              });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="image-upload">
      <progress className="image-upload-progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      ></input>
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}
