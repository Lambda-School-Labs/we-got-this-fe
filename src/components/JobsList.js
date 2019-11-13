import React, { useEffect } from "react";
import JobsCards from "./JobsCards";
// import { getJobs } from "../utils/actions";

function JobsList({ getJobs, jobs }) {
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <>
      <h2>List of jobs</h2>
      <div>
        {jobs.map(job => {
          return <JobsCards  job={job} />;
        })}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs,
    isFetching: state.isFetching,
    error: state.error
  };
};

export default (
  mapStateToProps,
  { getJobs }
)(JobsList);