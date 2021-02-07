import { useState, useEffect } from "react";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

import JobCard from "../JobCard/JobCard";
import NewCard from "../NewCard/NewCard";

import Loader from "react-loader-spinner";

import "./styles.css";

export default function JobPage(props) {
  const [jobsList, setJobsList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setJobsList([]);
    setShow(true);
    getJobs();
  }, []);

  const getJobs = () => {
    axios
      .get("https://jobs-backend-project.herokuapp.com/listjobs")
      .then((response) => {
        setShow(false);
        setJobsList([...response.data.data]);
      });
  };

  return (
    <div className="jobpage">
      <Loader
        type="Grid"
        color="#01697D"
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
      {jobsList.length > 0
        ? jobsList.map((job, index) => {
            // return <JobCard key={index} jobData={job} />;
            return (
              <NewCard key={index} jobData={job} user={props.location.state} />
            );
          })
        : "No JOBS Available"}
    </div>
  );
}
