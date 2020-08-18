import React, { ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {}

export default function NotFoundPage({}: Props): ReactElement {
  return (
    <div title="Page Not Found">
      <Typography variant="h5" align="center" paragraph>
        Sorry, this page isn't available.
      </Typography>

      <Typography align="center">
        The link you followed may be broken, or the page may have been removed.
        <Link to="/">
          {" "}
          <Typography color="primary" component="span">
            Go back to Instagram.
          </Typography>
        </Link>
      </Typography>
    </div>
  );
}
