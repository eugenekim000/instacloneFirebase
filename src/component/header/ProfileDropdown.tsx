import React, { ReactElement } from "react";
import { ReactComponent as Profile } from "../../images/user-selected.svg";
import { ReactComponent as Settings } from "../../images/settings.svg";

interface Props {}

export function ProfileDropdown({}: Props): ReactElement {
  return (
    <div className="profile-dropdown-container">
      <div className="profile-dropdown-wrapper">
        <div className="dropdown-item">
          <Profile /> Profile
        </div>
        <div className="dropdown-item">
          {" "}
          <Settings /> Settings
        </div>
        <div className="dropdown-item">Log out</div>
      </div>
    </div>
  );
}
