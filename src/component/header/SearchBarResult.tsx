import React, { ReactElement, useEffect, useRef, useState } from "react";
import { SearchResultItem } from "./SearchResultItem";

interface Props {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setFoundUsers: React.Dispatch<any>;
  foundUsers: any;
}

export default function SearchBarResult({
  setInput,
  setFoundUsers,
  foundUsers,
}: Props): ReactElement {
  const [clickedOutside, setClickedOutside] = useState(false);
  const myRef: any = useRef();

  const handleClickOutside = (e: any) => {
    if (!myRef.current!.contains(e.target)) {
      setClickedOutside(true);
      setInput("");
      setFoundUsers([]);
    }
  };

  useEffect(() => {
    console.log(foundUsers, "found users passed in prop");
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div ref={myRef} className="search-result-container">
      {foundUsers.map((foundUser: any) => (
        <SearchResultItem foundUsers={foundUser} />
      ))}
    </div>
  );
}
