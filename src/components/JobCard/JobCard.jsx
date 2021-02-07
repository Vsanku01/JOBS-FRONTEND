import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    maxHeight: 200,
  },
});

const JobCard = ({ jobData }) => {
  const { id, description, title } = jobData;
  const classes = useStyles();
  return (
    <Card className={classes.root} style={{ marginBottom: "15px" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Apply Now
        </Button>
        <Button size="small" color="primary">
          Contact
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
