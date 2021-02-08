import { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./Home.css";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Hidden } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { toast } from "react-toastify";
import Navbar from "../JobPage/Navbar";

import Loader from "react-loader-spinner";

const categories = [
  {
    value: "recruiter",
  },
  {
    value: "user",
  },
];

toast.configure();

const Home = (props) => {
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUser, setSignedUser] = useState("");
  const [open, setOpen] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [show, setShow] = useState(false);

  let history = useHistory();

  // const notifySuccess = (message) => {
  //   toast.success(message);
  // };

  // const notifyError = (message) => {
  //   toast.error(message);
  // };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const signinButtonHandler = () => {
    if (!email || !password || !category) {
      return toast.error("Please fill all the fields");
    }
    setNewUser(true);
    if (category === "user" && open === false) {
      toast.info("Please provide the resume link for reference");
      setOpen(true);
    }

    if (category === "user" && open === true) {
      if (resumeLink !== "") {
        // User
        let userData = {
          email: email,
          password: password,
          category: category,
          resume: resumeLink,
        };
        createNewUser(userData);
      } else if (resumeLink === "") {
        toast.error("Please provide the resume link");
      }
    }

    if (category === "recruiter") {
      let userData = {
        email: email,
        password: password,
        category: category,
      };
      createNewUser(userData);
    }
  };

  const createNewUser = (userData) => {
    // Start Loader
    setShow(true);

    fetch("https://jobs-backend-project.herokuapp.com/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        // Stop Loader
        setShow(false);
        toast.success(response.message);
        if (response.flag && response.category === "user") {
          setSignedUser(email);
          props.history.push({
            pathname: "/jobs",
            state: email,
          });
        }
        if (response.flag && response.category === "recruiter") {
          setSignedUser(email);
          props.history.push({
            pathname: "/postjob",
            state: email,
          });
        }
      });
  };

  const loginButtonHandler = () => {
    if (!email || !password || !category) {
      return toast.error("Please fill all the fields");
    }
    let userData = {
      email: email,
      password: password,
      category: category,
    };

    // Start Loader
    setShow(true);

    fetch("https://jobs-backend-project.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    }).then(async (res) => {
      let result = await res.json();
      // Stop Loader
      setShow(false);
      toast.success(result.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      if (result.flag && result.category === "user") {
        setSignedUser(email);
        props.history.push({
          pathname: "/jobs",
          state: email,
        });
      } else if (result.flag && result.category === "recruiter") {
        setSignedUser(email);
        props.history.push({
          pathname: "/postjob",
          state: email,
        });
      }
    });
  };

  return (
    <div className="form">
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
      <Navbar show={false} />
      <h1>Login/ Signup</h1>
      <form className="register-fields">
        <TextField
          fullWidth
          placeholder="Email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Recruiter/User"
          value={category}
          onChange={handleChange}
          helperText="Select how do you want to login?"
          variant="outlined"
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        {/* Hide */}
        <Box display={open ? "block" : "none"}>
          <TextField
            fullWidth
            placeholder="Link"
            label="Resume Link"
            variant="outlined"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            helperText="Provide a link to your resume or portfolio"
          />
        </Box>

        <Button
          component={Link}
          size="medium"
          variant="contained"
          color="primary"
          onClick={() => loginButtonHandler()}
          style={{ marginBottom: "10px" }}
        >
          Login
        </Button>
        <Button
          component={Link}
          size="medium"
          variant="contained"
          color="primary"
          onClick={() => signinButtonHandler()}
        >
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Home;
