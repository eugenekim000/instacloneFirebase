import React, { ReactElement, useState, useEffect } from "react";
import { allUserQuery } from "../../queries";
import firebase from "firebase";
import SearchBarResult from "./SearchBarResult";

const firebaseId = firebase.firestore.FieldPath.documentId();

export default function SearchBar(): ReactElement {
  const [input, setInput] = useState("");
  const [foundUsers, setFoundUsers] = useState<any>([]);

  useEffect(() => {
    let prefixFound: any;
    if (input) {
      prefixFound = allUserQuery()
        .where(firebaseId, ">=", "e")
        .where(firebaseId, "<=", "e" + "\uf8ff")
        .get()
        .then((snapShot) => {
          console.log("found!!!!");
          console.log(snapShot.docs);
          setFoundUsers(snapShot.docs.map((doc) => doc.id));
        });
    }

    return () => prefixFound;
  }, [input]);

  const handleChange = (e: any) => {
    let value = e.target.value;
    setInput(value);
  };

  return (
    <div className="search-bar-container">
      <input
        value={input}
        placeholder="Search"
        className="header-search-bar"
        onChange={(e) => handleChange(e)}
      ></input>
      {foundUsers.length > 0 && (
        <SearchBarResult setInput={setInput} setFoundUsers={setFoundUsers} />
      )}
    </div>
  );
}
