import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CallMade from "@material-ui/icons/CallMade";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

import { Row, Column, Item } from "@mui-treasury/components/flex";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";
import Modal from "@material-ui/core/Modal";

import axios from "axios";
import { toast } from "react-toastify";

toast.configure();

const StyledTooltip = withStyles({
  tooltip: {
    marginTop: "0.2rem",
    backgroundColor: "rgba(0,0,0,0.72)",
    color: "#fff",
  },
})(Tooltip);

const useBasicProfileStyles = makeStyles(({ palette }) => ({
  avatar: {
    borderRadius: 8,
    backgroundColor: "#495869",
  },
  overline: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#8D9CAD",
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: "#495869",
  },
}));

const BasicProfile = (props) => {
  const styles = useBasicProfileStyles();
  let char = props.email[0].toUpperCase();
  return (
    <Row {...props}>
      <Item>
        <Avatar className={styles.avatar}>{char}</Avatar>
      </Item>
      <Item position={"middle"} pl={{ sm: 0.5, lg: 0.5 }}>
        {/* <Typography className={styles.overline}>CREATOR..</Typography> */}
        <Typography className={styles.name}>{props.email}</Typography>
      </Item>
    </Row>
  );
};

const useCardHeaderStyles = makeStyles(() => ({
  root: { paddingBottom: 0 },
  title: {
    fontSize: "1.25rem",
    color: "#122740",
  },
  subheader: {
    fontSize: "0.875rem",
    color: "#495869",
  },
}));

const CardHeader = (props) => {
  const styles = useCardHeaderStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });
  return (
    <Row {...props}>
      <Item position={"middle"}>
        <Typography className={styles.title}>
          <b>{props.title}</b>
        </Typography>
        <Typography className={styles.subheader}>{props.location}</Typography>
      </Item>
      <Item position={"right"} mr={-0.5}>
        <StyledTooltip title={"See details"}>
          <IconButton classes={iconBtnStyles}>{/* <CallMade /> */}</IconButton>
        </StyledTooltip>
      </Item>
    </Row>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    border: "2px solid",
    borderColor: "#E7EDF3",
    borderRadius: 16,
    transition: "0.4s",
    "&:hover": {
      borderColor: "#5B9FED",
    },
  },
}));

export const ShowcaseCardDemo = React.memo(function ShowcaseCard({
  jobData,
  user,
}) {
  const { id, description, title, location, email } = jobData;
  const styles = useStyles();
  const gap = { xs: 1, sm: 1.5, lg: 2 };

  const notify = () => {
    toast.success("Applied Successfully");
  };

  const buttonHandler = () => {
    const applyData = {
      id: id,
      userEmail: user,
      recruiterEmail: email,
    };
    axios
      .post("https://jobs-backend-project.herokuapp.com/applyjob", applyData)
      .then((response) => {
        // alert(response.data.message);
        notify();
      });
  };
  return (
    <>
      <Grid container spacing={4} justify={"center"}>
        <Grid item xs={12} sm={8} lg={7}>
          <Row
            className={styles.card}
            p={{ xs: 0.5, sm: 0.75, lg: 1 }}
            gap={gap}
          >
            <Item grow>
              <Box minHeight={200} bgcolor={"#F4F7FA"} borderRadius={8} p={5}>
                <Typography variant="h6" color="textSecondary" component="p">
                  {description}
                </Typography>
              </Box>
            </Item>
            <Column>
              <CardHeader title={title} location={location} />
              <BasicProfile position={"bottom"} email={email} />
              <Button variant="outlined" onClick={() => buttonHandler()}>
                Apply
              </Button>
            </Column>
          </Row>
        </Grid>
      </Grid>
    </>
  );
});
export default ShowcaseCardDemo;
