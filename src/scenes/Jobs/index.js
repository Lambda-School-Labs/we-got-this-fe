import React, { useState } from 'react';
import Firebase from '../../config/firebase';

const storageRef = Firebase.getStorageRef();

const Jobs = () => {
    const [files, setFiles] = useState(null);

    const handleFiles = e => {
        setFiles(e.target.files);
    };

    const handleUpload = () => {
        let uploadTask = storageRef.child('images/scott').put(files[0]);
        uploadTask.on(
            'state_changed',
            snapshot => {
                //progress
            },
            error => {
                //error handler
                console.log(error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    console.log('The download URL is: ', downloadURL);
                });
            }
        );
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
            {files !== null && <button onClick={handleUpload}>Upload!</button>}
        </>
    );
};

export default Jobs;
