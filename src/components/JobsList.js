import React, { useEffect, useState } from "react";
import JobsCards from "./JobsCards";

const JobsList = ({ getJobs, jobs }) => {
    const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const firestore = firebase.getFirestore();

    firestore.collection('jobs')
        .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
        .get()
        .then(snapshot => setJobs(snapshot.docs.map(doc => doc.data())));
}, []);

  return (
    <>
      <h2>Jobs List</h2>
      <div>
        {jobs.map(job => {
          return <JobsCards  job={job} />;
        })}
      </div>
    </>
  );
}


export default JobsList;