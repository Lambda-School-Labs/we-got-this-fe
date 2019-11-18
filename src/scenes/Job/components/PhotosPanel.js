import React from 'react';
import { Box } from '@material-ui/core';

const PhotosPanel = ({ value, index }) => {
    return (
        <Box hidden={value !== index}>
            <p>Photos</p>
        </Box>
    );
};

export default PhotosPanel;
