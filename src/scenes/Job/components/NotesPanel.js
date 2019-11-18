import React from 'react';
import { Box } from '@material-ui/core';

const NotesPanel = ({ value, index }) => {
    return (
        <Box hidden={value !== index}>
            <p>Notes</p>
        </Box>
    );
};

export default NotesPanel;
