import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    useMediaQuery,
    useTheme,
    makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const DialogWrapper = ({
    children,
    trigger,
    dialogContent,
    title,
    size,
    showTitle = true,
    noPadding = false,
}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {trigger(handleOpen)}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={size}
                scroll="body"
                fullScreen={fullScreen}
            >
                {showTitle || fullScreen ? (
                    <DialogTitle>
                        {title}
                        <IconButton
                            aria-label="close"
                            className={classes.closeButton}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                ) : null}
                {noPadding && !fullScreen ? (
                    <>{dialogContent(handleClose)}</>
                ) : (
                    <DialogContent>{dialogContent(handleClose)}</DialogContent>
                )}
            </Dialog>
        </div>
    );
};

export default DialogWrapper;
