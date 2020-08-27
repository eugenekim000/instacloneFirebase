import React, { ReactElement, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { auth } from "firebase";
import { useHistory } from "react-router-dom";

import { ReactComponent as Profile } from "../../images/user-selected.svg";
import { ReactComponent as Settings } from "../../images/settings.svg";

interface Props {
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProfileDropdown({ setRender }: Props): ReactElement {
  const myRef: any = useRef();
  const user = useContext(UserContext);
  const history = useHistory();

  const handleClickOutside = (e: any) => {
    if (!myRef.current!.contains(e.target)) {
      setRender(false);
    }
  };

  useEffect(() => {
    console.log(user, "use from profile dropdown");
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={myRef} className="profile-dropdown-container">
      <div className="profile-dropdown-wrapper">
        <div className="dropdown-item">
          <Link to={user ? `/${user.displayName}` : "/"}>
            {" "}
            <Profile /> Profile
          </Link>
        </div>
        <div className="dropdown-item">
          {" "}
          <Link to="/accounts/edit">
            {" "}
            <Settings /> Settings
          </Link>
        </div>
        <div className="dropdown-item">
          <button
            className="dropdown-signout-button"
            onClick={() =>
              auth()
                .signOut()
                .then(() => {
                  history.replace({ pathname: `/` });
                  history.go(0);
                })
            }
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
