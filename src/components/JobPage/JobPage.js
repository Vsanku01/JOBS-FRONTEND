import { useState, useEffect } from "react";
import axios from "axios";

import JobCard from "../JobCard/JobCard";
import NewCard from "../NewCard/NewCard";

import "./styles.css";

export default function JobPage(props) {
  const [jobsList, setJobsList] = useState([]);

  useEffect(() => {
    setJobsList([]);
    getJobs();
  }, []);

  const getJobs = () => {
    axios.get("http://localhost:5000/listjobs").then((response) => {
      setJobsList([...jobsList, ...response.data.data]);
    });
  };

  return (
    <div className="jobpage">
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
