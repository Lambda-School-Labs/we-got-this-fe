import React, { useState, useRef } from 'react';

//State
import Firebase from '../../../config/firebase';
import { useStateValue } from '../../../state';

//Components
import { Button, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';

//Custom Components
import MuiTextInput from '../../../components/formItems/MuiTextInput';
import MuiTextAreaInput from '../../../components/formItems/MuiTextAreaInput';
import { SplashLoading } from '../../../components';
import Image from './Image';

//Actions
import { actions } from '../../../state/jobs/jobsActions';

const storageRef = Firebase.getStorageRef();

const NewPhoto = ({ handleClose, photo }) => {
    const [{ customers }, dispatch] = useStateValue();
    const [uploadedImg, setUploadedImg] = useState(
        (photo && photo.url) || null
    );
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const fileInput = useRef(null);
    const theme = useTheme();

    const handleChange = e => {
        let file = e.target.files[0];

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
                    console.log('The download URL is: ', downloadURL);
                });
            }
        );
    };

    const getPhotos = () => {
        let job = customers.customerJobs.find(
            job => job.docId == location.state
        );
        let photos = job.photos || [];
        return photos;
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                {loading ? (
                    <SplashLoading width={150} height={150} />
                ) : (
                    <>
                        <input
                            type="file"
                            id="imgUpload"
                            ref={fileInput}
                            onChange={e => handleChange(e)}
                            style={{ display: 'none' }}
                        />
                        <Image
                            img={(photo && photo.url) || uploadedImg}
                            onClick={() => fileInput.current.click()}
                        >
                            <p>Click to change</p>
                        </Image>
                    </>
                )}
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                justify="space-between"
                style={{ padding: theme.spacing(2) }}
            >
                <Formik
                    initialValues={{
                        tag: (photo && photo.tag) || '',
                        note: (photo && photo.note) || '',
                    }}
                    onSubmit={async values => {
                        //This is my janky check if the form was loaded with props and should be an update action
                        if (photo) {
                            let res = await actions.updateJobImage(dispatch, {
                                ...values,
                                uploadedImg,
                                jobId: location.state,
                                photos: getPhotos(),
                            });
                            if (res === true) {
                                handleClose();
                            }
                        } else {
                            let res = await actions.uploadJobImage(dispatch, {
                                ...values,
                                uploadedImg,
                                jobId: location.state,
                                photos: getPhotos(),
                            });
                            if (res === true) {
                                handleClose();
                            }
                        }
                    }}
                >
                    <Form>
                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="stretch"
                        >
                            <Grid item>
                                <MuiTextInput
                                    name="tag"
                                    label="House Location or Tag"
                                />
                                <MuiTextAreaInput name="note" label="Notes" />
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{ marginTop: 30 }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Save Photo
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    );
};

export default NewPhoto;
