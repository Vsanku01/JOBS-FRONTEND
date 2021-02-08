import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Navbar(props) {
  const history = useHistory();
  const [hide, setHide] = useState(false);

  const handleOnClick = useCallback(() => {
    history.replace("/");
  }, [history]);

  // console.log(props);
  useEffect(() => {
    if (props.hasOwnProperty("show")) {
      console.log("Hello");
      setHide(true);
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Job Hunt</Typography>
            <div style={{ flexGrow: 1 }} />
            <Box display={hide ? "none" : "block"}>
              <Button style={{ color: "white" }} onClick={handleOnClick}>
                <Typography variant="body1">Logout</Typography>
              </Button>
            </Box>
          </Toolbar>
          <div style={{ flexGrow: 1 }} />
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
