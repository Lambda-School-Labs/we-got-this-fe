import React from 'react';
import { Box } from '@material-ui/core';

const PhotosPanel = ({ value, index, job }) => {
    console.log('The job passed to PhotosPanel: ', job);
    return (
        <Box hidden={value !== index}>
            <img src={job.approved_checklist_url} width="200" height="200" />
        </Box>
    );
};

export default PhotosPanel;
