import React, { ReactElement, useEffect, useRef, useState } from "react";

interface Props {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setFoundUsers: React.Dispatch<any>;
}

export default function SearchBarResult({
  setInput,
  setFoundUsers,
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div ref={myRef} className="search-result-container">
      {" "}
      uhnyeah{" "}
    </div>
  );
}
