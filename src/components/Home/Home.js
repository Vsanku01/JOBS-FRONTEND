import { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./Home.css";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Hidden } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const categories = [
  {
    value: "recruiter",
  },
  {
    value: "user",
  },
];

const Home = (props) => {
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUser, setSignedUser] = useState("");
  const [open, setOpen] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [newUser, setNewUser] = useState(false);

  let history = useHistory();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const signinButtonHandler = () => {
    if (!email || !password || !category) {
      return alert("Please fill all the fields");
    }
    setNewUser(true);
    if (category === "user" && open === false) {
      alert("Please provide the resume link for reference");
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
        alert("Please provide the resume link");
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
    fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.message);
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
      return alert("Please fill all the fields");
    }
    let userData = {
      email: email,
      password: password,
      category: category,
    };

    fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    }).then(async (res) => {
      let result = await res.json();
      alert(result.message);
      if (result.flag && result.category === "user") {
        console.log("Entering Case-1");
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
