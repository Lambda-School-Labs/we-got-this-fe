import React from 'react';
import { ButtonBase } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

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

export default Image;
