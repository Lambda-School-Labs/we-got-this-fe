import React, { useState, useEffect, useRef } from 'react';

//State
import Firebase from '../../../config/firebase';
import { useStateValue } from '../../../state';

//Components
import { Dialog, Button, ButtonBase, Grid } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';

//Custom Components
import DialogWrapper from '../../../components/dialogs/DialogWrapper';
import MuiTextInput from '../../../components/formItems/MuiTextInput';
import MuiTextAreaInput from '../../../components/formItems/MuiTextAreaInput';
import { SplashLoading } from '../../../components';

//Actions
import { actions } from '../../../state/jobs/jobsActions';

const storageRef = Firebase.getStorageRef();

const Image = styled(({ img, ...other }) => <ButtonBase {...other} />)({
    width: '100%',
    height: 250,
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

const ViewPhoto = ({ handleClose }) => {
    return (
        <>
            <Image />
            <Button onClick={handleClose()}>Close</Button>
        </>
    );
};

export const NewPhoto = ({ handleClose }) => {
    const [{ customers }, dispatch] = useStateValue();
    const [uploadedImg, setUploadedImg] = useState(null);
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
                            img={uploadedImg}
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
                        tag: '',
                        note: '',
                    }}
                    onSubmit={async values => {
                        let res = await actions.uploadJobImage(dispatch, {
                            ...values,
                            uploadedImg,
                            jobId: location.state,
                            photos: getPhotos(),
                        });
                        if (res === true) {
                            handleClose();
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

const LightBox = ({ src, newPhoto }) => {
    return (
        <DialogWrapper
            trigger={click => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    fullWidth
                    onClick={() => click()}
                >
                    Add Photo
                </Button>
            )}
            dialogContent={close => <NewPhoto handleClose={close} />}
            title="New Photo"
            size="xs"
            showTitle={false}
            noPadding={true}
        />
    );
};

export default LightBox;
