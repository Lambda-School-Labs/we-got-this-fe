import React, { useState, useEffect } from 'react';
import {
    Box,
    ButtonBase,
    Dialog,
    DialogActions,
    Button,
    Paper,
    DialogContent,
} from '@material-ui/core';

const PhotosPanel = ({ value, index, job }) => {
    console.log('The job passed to PhotosPanel: ', job);
    const [selectedImg, setSelectedImg] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box hidden={value !== index}>
            <ButtonBase
                onClick={() => {
                    setOpen(true);
                    setSelectedImg(job.approved_checklist_url);
                }}
            >
                {job &&
                    job.photos.map(photo => (
                        <Paper>
                            <img src={photo.url} width="200" height="200" />
                            <p>{photo.note}</p>
                        </Paper>
                    ))}
            </ButtonBase>
            <Dialog open={open}>
                <DialogContent>
                    <img src={selectedImg} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button>Add Note</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PhotosPanel;
