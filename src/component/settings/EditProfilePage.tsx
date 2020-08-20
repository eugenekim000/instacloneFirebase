import React, { ReactElement, useState } from "react";
import "../../styling/Settings.css";
import { Avatar, makeStyles } from "@material-ui/core";
import EditPublic from "./EditPublic";
import EditPassword from "./EditPassword";

interface Props {}

export default function EditProfilePage({}: Props): ReactElement {
  const [edit, setEdit] = useState("edit");

  return (
    <div className="setting-grid">
      <div className="settings-container">
        <div className="settings-tabs">
          <button
            onClick={() => setEdit("edit")}
            style={edit === "edit" ? styleSelectedButton : undefined}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setEdit("changePW")}
            style={edit === "changePW" ? styleSelectedButton : undefined}
          >
            {" "}
            Change Password
          </button>
        </div>
        {edit === "edit" && <EditPublic />}

        {edit === "changePW" && <EditPassword />}
      </div>
    </div>
  );
}

export const useStyles = makeStyles((theme) => ({
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
  medium: {
    width: "35px",
    height: "35px",
    justifySelf: "end",
  },
}));

const styleSelectedButton = {
  borderLeft: "1px solid #222",
  fontWeight: 550,
};
