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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date, email, link) {
  return { date, email, link };
}

const rows = [
  createData("2021-02-07", "user@gmail.com", "https://www.google.com "),
  createData("2021-02-07", "user@gmail.com", "https://www.google.com "),
  createData("2021-02-07", "user@gmail.com", "https://www.google.com "),
];

export default function ViewTable({ user }) {
  const [candidatesList, setCandidatesList] = useState([]);

  useEffect(() => {
    setCandidatesList([]);
    getCandidates();
  }, []);

  const getCandidates = () => {
    axios
      .post("https://jobs-backend-project.herokuapp.com/view-candidates", {
        email: user,
      })
      .then((response) => {
        console.log(response.data.message);
        setCandidatesList([...candidatesList, ...response.data.message]);
      });
  };

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date Applied</TableCell>
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
