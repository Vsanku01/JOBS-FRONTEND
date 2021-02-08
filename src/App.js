import Home from "./components/Home/Home";
import JobPage from "./components/JobPage/JobPage";
import RecruiterPage from "./components/RecruiterPage/RecruiterPage";
import PostJob from "./components/PostJob/PostJob";
import ViewCandidate from "./components/ViewCandidates/ViewCandidate";

import "./App.css";

import Test from "./components/Test";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/jobs" component={JobPage} exact />
          <Route path="/postjob" component={PostJob} exact />
          <Route path="/newjob" component={PostJob} exact />
          <Route path="/view" component={ViewCandidate} exact />
          <Route path="/test" component={Test} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
