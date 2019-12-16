import React, { useState, useEffect, useRef } from 'react';
import Firebase from '../../../config/firebase';

//Components
import { ButtonBase } from '@material-ui/core';
import { SplashLoading } from '../../../components';
import { useLocation } from 'react-router-dom';

//styles
import { styled } from '@material-ui/core/styles';
import { useStateValue } from '../../../state';
import { actions } from '../../../state/jobs/jobsActions';

const storageRef = Firebase.getStorageRef();

const Image = styled(({ img, ...other }) => <ButtonBase {...other} />)({
    width: '100%',
    height: 400,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: props =>
        props.img
            ? `url(${props.img})`
            : 'url(https://www.chalktalksports.com/on/demandware.static/Sites-ChalkTalkSports-Site/-/default/dw552617e4/images/Placeholder.jpg)',

    '& p': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        color: '#fff',
        visibility: 'hidden',
        opacity: 0,
    },

    '&:hover p': {
        opacity: 1,
        visibility: 'visible',
    },
});

/*
    Displays a job's checklist

    Example Props:
        "img": "http://example.com/"
*/
const ChecklistImage = ({ img, approved = false, handleClose }) => {
    const [{ customers }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);
    const [uploadedImg, setUploadedImg] = useState(null);
    const fileInput = useRef(null);
    const location = useLocation();

    //Clear the uploaded img to allow the user to switch between jobs
    //This is because this component doesn't unmount between job selections
    useEffect(() => {
        setUploadedImg(null);
    }, [location]);

    const handleFileChange = e => {
        const file = e.target.files[0];
        let uploadTask = storageRef
            .child(
                `customers/${customers.currentCustomer.docId}/jobs/${location.state}/${file.name}`
            )
            .put(file);

        uploadTask.on(
            'state_changed',
            snapshot => {
                //progress
                setLoading(true);
            },
            error => {
                //error handler
                console.log(error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    setLoading(false);
                    setUploadedImg(downloadURL);
                    if (approved === true) {
                        actions.saveChecklistToJob(
                            dispatch,
                            location.state,
                            downloadURL
                        );
                        handleClose();
                    }
                    console.log('The download URL is: ', downloadURL);
                });
            }
        );
    };

    return (
        <>
            {loading ? (
                <div style={{ width: '128px', height: '128px' }}>
                    <SplashLoading />
                </div>
            ) : (
                <>
                    <input
                        type="file"
                        ref={fileInput}
                        id="imgUpload"
                        onChange={e => handleFileChange(e)}
                        style={{ display: 'none' }}
                    />
                    <Image
                        img={img || uploadedImg}
                        onClick={() => {
                            fileInput.current.click();
                        }}
                    >
                        <p>Click to change</p>
                    </Image>
                </>
            )}
        </>
    );
};

export default ChecklistImage;
