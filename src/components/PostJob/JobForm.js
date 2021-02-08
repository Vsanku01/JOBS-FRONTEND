import React, { useState, useReducer } from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import axios from "axios";

import Loader from "react-loader-spinner";

import "./styles.css";

const categories = [
  {
    value: "Full-time",
  },
  {
    value: "Part-time",
  },
  {
    value: "Contract",
  },
];

function JobForm(props) {
  // name, type => category , email, location, title, desc
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    root: {
      padding: theme.spacing(3, 2),
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400,
    },
  }));

  const classes = useStyles();

  const buttonHandler = (e) => {
    e.preventDefault();
    if (
      !name ||
      !type ||
      !email ||
      !location ||
      !title ||
      !description ||
      !companyName
    ) {
      return alert("Please fill all the fields");
    } else {
      setShow(true);
      console.log(name, type, email, location, title, description, companyName);
      let formData = {
        name,
        type,
        email,
        location,
        title,
        description,
        company: companyName,
      };
      axios
        .post("https://jobs-backend-project.herokuapp.com/postjob", formData)
        .then((response) => {
          setShow(false);
          alert(response.data.message);
          setName("");
          setCompanyName("");
          setType("");
          setEmail("");
          setLocation("");
          setTitle("");
          setDescription("");
        });
    }
    console.log("Clicked button");
  };

  // email, type, company, location, title, description

  return (
    <div>
      <Loader
        type="Oval"
        color="#4150B5"
        height={100}
        width={100}
        timeout={500000000}
        visible={show ? true : false}
        height="60px"
        style={{
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%,-50%)",
          zIndex: "10",
        }}
      />
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {props.formName}
        </Typography>
        <Typography component="p">{props.formDescription}</Typography>

        <form className="form-fields">
          {/* Name */}
          <TextField
            label="Recruiter Name"
            id="margin-normal"
            name="name"
            defaultValue="Name"
            className={classes.textField}
            helperText="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* Company Name */}
          <TextField
            label="Company Name"
            id="margin-normal"
            name="name"
            defaultValue="Name"
            className={classes.textField}
            helperText="Enter name of your company"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          {/* Type */}
          <TextField
            id="outlined-select-currency"
            select
            label="Employment type"
            value={type}
            onChange={handleChange}
            helperText="Select the respective employment type "
            variant="outlined"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          {/* Email */}
          <TextField
            label="Email"
            id="margin-normal"
            name="email"
            defaultValue="Email"
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Location */}
          <TextField
            label="Location"
            id="margin-normal"
            name="location"
            defaultValue=""
            className={classes.textField}
            helperText="e.g. Delhi"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {/* Title */}
          <TextField
            label="Title"
            id="margin-normal"
            name="location"
            defaultValue=""
            className={classes.textField}
            helperText="e.g. Full Stack Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* Description */}
          <Typography variant="body2" component="h2" color="inherit">
            Job Description
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={3}
            placeholder="Please enter the Job Description and details here.."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            type=""
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => buttonHandler(e)}
          >
            Post Job
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default JobForm;
