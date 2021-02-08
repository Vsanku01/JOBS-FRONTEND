import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

import axios from "axios";
import Loader from "react-loader-spinner";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date, email, link) {
  return { date, email, link };
}

export default function ViewTable({ user }) {
  const [candidatesList, setCandidatesList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setCandidatesList([]);
    getCandidates();
  }, []);

  const getCandidates = () => {
    axios
      .post("https://jobs-backend-project.herokuapp.com/view-candidates", {
        email: user,
      })
      .then((response) => {
        setShow(false);
        console.log(response.data.message);
        setCandidatesList([...response.data.message]);
      });
  };

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
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
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date Applied</TableCell>
            <TableCell align="right">Position Applied</TableCell>
            <TableCell align="right">Candidate Email</TableCell>
            <TableCell align="right">Resume/Portfolio Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidatesList.map((row) => (
            <TableRow key={row.dateApplied}>
              <TableCell component="th" scope="row">
                {row.dateApplied}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.userEmail}</TableCell>
              <TableCell align="right">
                <Link href={row.resume} target="_blank">
                  {row.resume}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
