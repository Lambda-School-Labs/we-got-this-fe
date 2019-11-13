import React, { useState } from 'react';
import Firebase from '../../config/firebase';
import JobsCards from '../../components/JobsCards';

const storageRef = Firebase.getStorageRef();

const Dashboard = () => {
    const [files, setFiles] = useState(null);

    const handleFiles = e => {
        setFiles(e.target.files);
    };

    return (
        <>
            <h1>Dashboard</h1>{' '}
            <label htmlFor="fileInput">Select Files to Upload</label>
            <input
                type="file"
                id="fileInput"
                multiple
                onChange={e => {
                    handleFiles(e);
                }}
            />
            {files !== null && (
                <button
                    onClick={() => {
                        console.log('Clicked!');
                        storageRef
                            .child('images/me')
                            .put(files[0])
                            .then(snapshot => {
                                console.log(snapshot);
                            });
                    }}
                >
                    Upload!
                </button>
            )}
            <JobsCards />
        </>
    );
};

export default Dashboard;
