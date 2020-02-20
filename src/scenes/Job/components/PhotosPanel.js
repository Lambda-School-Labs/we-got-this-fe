import React from 'react';
import { Box, ButtonBase, Paper, Grid } from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';

import NewPhoto from './NewPhoto';
import DialogWrapper from '../../../components/dialogs/DialogWrapper';

const Image = styled(({ url, ...other }) => <ButtonBase {...other} />)({
    width: '100%',
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: props => `url(${props.url})`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
});

const PhotosPanel = ({ value, index, job }) => {
    const classes = useStyles();
    
    return (
        <Box hidden={value !== index}>
            {!job.photos || !job.photos.length ? (
                <Grid item xs={6}>
                    <p>No Photos</p>
                </Grid>
            ) : (
                <Grid container spacing={2}>
                    {job.photos.map(photo => (
                        <>
                            <Grid item xs={6} classes={{item:classes.gridItem}}>
                                <DialogWrapper
                                    trigger={click => (
                                        <Paper>
                                            <Image
                                                onClick={() => click()}
                                                url={photo.url}
                                            />
                                            <div style={{ padding: 5 }}>
                                                <h3
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    <strong>{photo.tag}</strong>
                                                </h3>
                                                <p>{photo.note}</p>
                                            </div>
                                        </Paper>
                                    )}
                                    dialogContent={close => (
                                        <NewPhoto
                                            handleClose={close}
                                            photo={photo}
                                        />
                                    )}
                                    title="New Photo"
                                    size="xs"
                                    showTitle={false}
                                    noPadding={true}
                                />
                            </Grid>
                        </>
                    ))}
                </Grid>
            )}
        </Box>
    );
};


const useStyles = makeStyles({
    gridItem: {
        maxWidth: '197px'
    }
})

export default PhotosPanel;
