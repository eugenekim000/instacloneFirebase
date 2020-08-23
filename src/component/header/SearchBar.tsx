import React, { ReactElement, useState, useEffect } from "react";
import { allUserQuery, userQuery } from "../../queries";
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
        .then((snapShot) => snapShot.docs.map((doc) => doc.id))
        .then((docIds) =>
          docIds.map((docId) =>
            userQuery(docId)
              .get()
              .then((snapShot: any) => {
                const { name, avatar } = snapShot.data();
                return { name, avatar, username: docId };
              })
          )
        )
        .then((finalData) => {
          Promise.all([...finalData]).then((values) => setFoundUsers(values));
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
        <SearchBarResult
          setInput={setInput}
          setFoundUsers={setFoundUsers}
          foundUsers={foundUsers}
        />
      )}
    </div>
  );
}
