import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import {routes} from '../../constants/routes';
import {actions} from '../../state/auth/authActions';
import {useHistory} from 'react-router-dom';
import {useStateValue} from '../../state';



const images = [
  {
    url: require('./components/img/field-img.jpg'),
    title: 'FIELD',
    width: '50%',
    height: '90',
    route:'/',

  },
  {
    url: require('./components/img/office-img.jpg'),
    title: 'OFFICE',
    width: '50%',
    height: '90',
    route:'/',
  },
 
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    height: '100%',
    
  },
  image: {
    position: 'relative',
    height: 450,
    top: 40,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 200,
      top: 40,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
        [theme.breakpoints.down('xs')]: {
      border: 'none',
    },
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
    
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(4)}px ${theme.spacing(8)}px ${theme.spacing(2) + 24}px`,
    fontSize: 70,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
      bottom: 20,
      fontSize: 40,   
    },
  },
  imageMarked: {
    height: 5,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
    [theme.breakpoints.down('xs')]: {
     opacity: 0,
    },
  },
}));

export default function ButtonBases() {
  const classes = useStyles();
  const [, dispatch] = useStateValue();
	const history = useHistory();
  
  return (
   <div>
    
    <div className={classes.root}>
      {images.map(image => (
        <ButtonBase
        	onClick={ () => {
			history.push(`${image.route}`);
					}}
			 focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
            height: image.height,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
    </div>
  );
}